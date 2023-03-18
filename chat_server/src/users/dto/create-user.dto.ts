import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsString()
  password: string;
}

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsString()
  password: string;
}

export class CreateChatRoomDto {
  name: string;
  uid: string;
}
export class JoinChatRoomDto {
  roomId: string;
  uid: string;
}
