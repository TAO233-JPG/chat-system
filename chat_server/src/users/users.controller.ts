import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, LoginDto } from './dto/create-user.dto';

@Controller('/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  create(@Body() createUserDto: CreateUserDto) {
    console.log('createUserDto', createUserDto);

    return this.usersService.create(createUserDto);
  }
  @Post()
  login(@Body() LoginDto: LoginDto) {
    return this.usersService.login(LoginDto);
  }

  @Get('chatRooms')
  findChatRooms(@Query('id') id: string, @Query('roomName') name: string) {
    return this.usersService.findChatRooms(id, name);
  }
}
