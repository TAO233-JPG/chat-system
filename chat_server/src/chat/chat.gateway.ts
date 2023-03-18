import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayDisconnect,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { v4 } from 'uuid';
import * as dayjs from 'dayjs';
import { formateData, responseTypes, WsStatus } from './chat.util';
import { store } from 'src/store';
import { ChatMessageDto, EntryChatRoomDto } from './chat.dto';

@WebSocketGateway({
  path: '/chat',
  allowEIO3: true,
  cors: {
    origin: /.*/,
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() private ws: Server; // socket实例
  private dataStore = store;
  private users = this.dataStore.getAllUsers();

  async handleConnection(client: Socket) {
    const { id } = client.handshake.auth;
    const clientId = client.id;
    const user = this.dataStore.getUser(id);
    if (!user) {
      client.emit(
        'init',
        formateData(responseTypes.init, { data: '用户不存在' }, WsStatus.fail),
      );
      client.disconnect();
      return;
    }
    const chatRooms = this.dataStore.getUserChatRooms(id);
    this.dataStore.setClientId(id, clientId);
    client.join(chatRooms.map((v) => v.id));
    client.emit('init', formateData(responseTypes.init, { user, chatRooms }));
  }

  /**
   * 断开链接
   */
  handleDisconnect(client: Socket) {
    const { id } = client.handshake.auth;
    this.dataStore.setClientId(id, undefined);
  }

  @SubscribeMessage(responseTypes.sendMessage)
  handleSendMessage(
    @MessageBody() data: ChatMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    this.sendMessage(client, data);
  }

  // 聊天发送消息
  sendMessage(client: Socket, data: ChatMessageDto) {
    const { roomId, sender } = data;
    const { message, id } = sender;

    const chatRecord = this.dataStore.saveChatRecord(roomId, {
      id: v4(),
      senderId: id,
      senderName: this.users[id].name,
      content: message,
      date: dayjs(),
    });

    this.ws
      .to(roomId)
      .emit(
        responseTypes.sendMessage,
        formateData(responseTypes.sendMessage, chatRecord),
      );
  }

  updateChatRooms(uid: string) {
    const user = this.dataStore.getUser(uid);
    const clientId = user.clientId;
    const chatRooms = this.dataStore.getUserChatRooms(uid);
    console.log(this.ws.serveClient);
    this.ws
      .to(clientId)
      .emit('init', formateData(responseTypes.init, { user, chatRooms }));
  }

  @SubscribeMessage(responseTypes.getRecord)
  handleEntryChatRoom(
    @MessageBody() data: EntryChatRoomDto,
    @ConnectedSocket() client: Socket,
  ): void {
    const { roomId } = data;
    const record = this.dataStore.getChatRecord(roomId);
    const result = {
      record,
      roomId,
    };
    client.emit(
      responseTypes.getRecord,
      formateData(responseTypes.getRecord, result),
    );
  }
}
