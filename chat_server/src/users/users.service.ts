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
    return res;
  }

  login(loginDto: LoginDto) {
    const { name, password } = loginDto;
    const user = store.getUser(name);
    if (user && user.password === password) {
      return '登录成功';
    }

    throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
