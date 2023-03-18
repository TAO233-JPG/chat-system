import { IsNotEmpty, IsString } from 'class-validator';

export class SenderDto {
  id: string;
  message: string;
}

export class ChatMessageDto {
  @IsNotEmpty()
  @IsString()
  roomId: string;
  sender: SenderDto;
}

export class EntryChatRoomDto {
  roomId: string;
}
