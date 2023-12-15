import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity'
import { JwtService } from '@nestjs/jwt';
import { LoginUserInput } from './dto/login-user.input';
import { CreateUserInput } from '../users/dto/create-user.input';
import * as bcrypt from 'bcrypt'
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService, 
    private jwtService: JwtService
    ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    const valid = await bcrypt.compare(password, user?.password)

    if (user && valid) {
      
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    return{
      access_token: this.jwtService.sign({ 
        username: user.username,
        sub: user.id,
    }),
      user
    }
  }

  async signup(createUserInput: CreateUserInput) {
    const user = await this.usersService.findOne(createUserInput.username)

    if(user) {
      throw new Error('User already exists')
    }

    const password = await bcrypt.hash(createUserInput.password, 10);

    return this.usersService.create({
      ...createUserInput,
      password,
    })
    }
  }
  


