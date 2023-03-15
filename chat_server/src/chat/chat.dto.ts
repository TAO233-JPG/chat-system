import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SenderDto {
  useId: string;
  message: string;
}

export class ChatMessageDto {
  @IsNotEmpty()
  @IsString()
  roomId: string;
  sender: SenderDto;
}
