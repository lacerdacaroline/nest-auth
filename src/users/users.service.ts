import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';


// export type User = any;
@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}
  // private readonly users = [
  //   {
  //     id:1,
  //     username: 'carol',
  //     password: 'not-secure',
  //   },
  //   {
  //     id:2,
  //     username: 'britney',
  //     password: 'not-secure',
  //   },
  // ];
  create(createUserInput: CreateUserInput): Promise<User> {
    const newUser = this.usersRepository.create(createUserInput);

    return this.usersRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  
  findOne(username: string): Promise<User> {
    return this.usersRepository.findOne({ where: { username } });
  }
}
  