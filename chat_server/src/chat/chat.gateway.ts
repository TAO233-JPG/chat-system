import { UseInterceptors } from '@nestjs/common';
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
import DataStore from 'src/store/store';
import { ChatMessageDto, EntryChatRoomDto } from './chat.dto';
import * as dayjs from 'dayjs';
import { formateData, responseTypes, WsStatus } from './chat.util';

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
  private dataStore = DataStore.getInstance();
  private chatRooms = this.dataStore.getAllChatRooms();
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

  @SubscribeMessage(responseTypes.getRecord)
  handleEntryChatRoom(
    @MessageBody() data: EntryChatRoomDto,
    @ConnectedSocket() client: Socket,
  ): void {
    const { roomId } = data;
    const record = this.dataStore.getChatRecord(roomId);
    client.emit(
      responseTypes.getRecord,
      formateData(responseTypes.getRecord, record),
    );
  }
}
