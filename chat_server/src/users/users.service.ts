import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, LoginDto } from './dto/create-user.dto';
import { store } from 'src/store';
import { Iuser } from 'src/store/type';
@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    const { name, password } = createUserDto;
    const user: Iuser = {
      name,
      password,
      id: name,
      chatRoomId: [],
      clientId: undefined,
    };
    const res = store.addUser(user);

    if (res === '当前用户以存在') {
      console.log(111);
      throw new HttpException(res, HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  login(loginDto: LoginDto) {
    const { name, password } = loginDto;
    const user = store.getUser(name);
    if (user && user.password === password) {
      return user;
    }

    throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);
  }

  findChatRooms(uid: string, name: string) {
    console.log(uid, name);

    const chatRoomSObj = store.getAllChatRooms();
    const chatRoomsList = Object.values(chatRoomSObj)
      .filter((room) => {
        return room.name.includes(name);
      })
      .map((room) => {
        const joined = !!room.users[uid];
        return { roomId: room.id, name: room.name, joined };
      });
    return chatRoomsList;
  }
}
