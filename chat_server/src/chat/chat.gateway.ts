import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

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
  private connectCounts = 0; // 当前在线人数
  private allNum = 0; // 全部在线人数
  private users: any = {}; // 人数信息

  /**
   * 链接成功
   */
  handleConnection(client: Socket) {
    this.connectCounts += 1;
    this.allNum += 1;
    this.users[client.id] = `user-${this.connectCounts}`;
    console.log('HHHHHHHHH');

    this.ws.emit('enter', {
      name: this.users[client.id],
      allNum: this.allNum,
      connectCounts: this.connectCounts,
    });
    client.emit('enterName', this.users[client.id]);
  }

  /**
   * 断开链接
   */
  handleDisconnect(client: Socket) {
    this.allNum -= 1;
    this.ws.emit('leave', {
      name: this.users[client.id],
      allNum: this.allNum,
      connectCounts: this.connectCounts,
    });
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, data: any): void {
    console.log('message 收到', data);

    this.ws.emit('message', {
      name: this.users[client.id],
      say: data,
    });
    client.emit('message', { msg: `私密，${client.id}` });
  }

  @SubscribeMessage('name')
  handleName(client: Socket, data: any): void {
    this.users[client.id] = data;
    client.emit('name', this.users[client.id]);
  }
}
