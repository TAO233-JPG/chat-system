import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CreateChatRoomDto,
  CreateUserDto,
  JoinChatRoomDto,
  LoginDto,
} from './dto/create-user.dto';
import { ChatGateway } from 'src/chat/chat.gateway';

@Controller('/user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly chatGateWay: ChatGateway,
  ) {}

  @Post('signup')
  create(@Body() createUserDto: CreateUserDto) {
    console.log('createUserDto', createUserDto);

    return this.usersService.create(createUserDto);
  }
  @Post()
  login(@Body() loginDto: LoginDto) {
    return this.usersService.login(loginDto);
  }

  @Get('chatRooms')
  findChatRooms(@Query('id') id: string, @Query('roomName') name: string) {
    return this.usersService.findChatRooms(id, name);
  }
  @Post('chatRoom')
  createChatRoom(@Body() createChatRoom: CreateChatRoomDto) {
    const res = this.usersService.createChatRoom(createChatRoom);
    this.chatGateWay.updateChatRooms(createChatRoom.uid, res.id);
    return res;
  }
  @Post('joinRoom')
  joinChatRoom(@Body() joinChatRoom: JoinChatRoomDto) {
    const res = this.usersService.joinChatRoom(joinChatRoom);
    this.chatGateWay.updateChatRooms(joinChatRoom.uid, joinChatRoom.roomId);
    return res;
  }
}
