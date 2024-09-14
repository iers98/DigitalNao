import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    
    constructor(private readonly userService: UsersService) {}

    @Post()
    createUser(@Body() newUser: CreateUserDto): Promise<User> {
      return this.userService.createUser(newUser);
    }

    @Get()
    findAll() : Promise<User[]> {
      return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.userService.findOne(+id);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
      return this.userService.remove(+id);
    }

    @Patch(':id')
    update(@Param('id',ParseIntPipe ) id: number, @Body() updateUserDto: UpdateUserDto) {
      return this.userService.update(+id, updateUserDto);
    }
}
