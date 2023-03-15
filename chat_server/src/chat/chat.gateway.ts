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
import { ChatMessageDto } from './chat.dto';
import { Dayjs } from 'dayjs';

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

  async handleConnection(client: Socket, data: any) {
    const { id } = client.handshake.auth;
    const clientId = client.id;
    const user = this.dataStore.getUser(id);
    if (!user) {
      const a = v4();
      client.emit('message', '用户不存在', a);
      // client.disconnect();
      return;
    }
    console.log(1111);

    this.dataStore.setClientId(id, clientId);
  }

  /**
   * 断开链接
   */
  handleDisconnect(client: Socket) {
    const { id } = client.handshake.auth;
    console.log('disconnect', client.handshake.auth, client.id);
    this.dataStore.setClientId(id, undefined);
  }

  @SubscribeMessage('message')
  handleEvent(
    @MessageBody() data: ChatMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    client.emit('message', data);
    console.log(data);

    return;
  }

  @SubscribeMessage('sendMessage')
  handleSendMessage(
    @MessageBody() data: ChatMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    client.emit('message', data, client.handshake.auth, client.id);
    this.sendMessage(client, data);
  }

  sendMessage(client: Socket, data: ChatMessageDto) {
    const { roomId, sender } = data;
    const { message, useId } = sender;
    const usersObj = this.dataStore.getChatRoomUsers(roomId);
    const chatRecord = this.dataStore.saveChatRecord(roomId, {
      id: v4(),
      senderId: useId,
      senderName: this.users[useId].name,
      content: message,
      date: new Dayjs(),
    });
    Object.values(usersObj).forEach((user) => {
      if (user.clientId) {
        client.to(user.clientId).emit('message', chatRecord);
      }
    });
  }

  @SubscribeMessage('name')
  handleName(client: Socket, data: any): void {
    this.users[client.id] = data;
    client.emit('name', this.users[client.id]);
  }
}
