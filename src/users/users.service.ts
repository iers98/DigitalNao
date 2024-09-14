import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UsersService {
    
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}
    
      createUser(user : CreateUserDto) {
        const newUser = this.usersRepository.create(user);
        return this.usersRepository.save(newUser);
      }

      findAll(): Promise<User[]> {
        return this.usersRepository.find();
      }

      findOne(id: number): Promise<User> {
        return this.usersRepository.findOneBy({ id });
      }
 
      async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
      }
      
      async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        await this.usersRepository.update(id, updateUserDto);
        return this.usersRepository.findOneBy({ id });
      }
}
