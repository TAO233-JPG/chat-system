import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ChatGateway } from 'src/chat/chat.gateway';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ChatGateway],
})
export class UsersModule {}
