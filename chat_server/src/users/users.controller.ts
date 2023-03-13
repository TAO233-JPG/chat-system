import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body(/* UsersPipe */) createUserDto: CreateUserDto) {
    console.log('createUserDto', createUserDto);

    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    console.log('ALL');
    return this.usersService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
