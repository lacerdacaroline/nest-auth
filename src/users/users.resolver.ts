import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserInput } from './dto/create-user.input';


@Resolver(of => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}


  @Query( returns => [User], { name: 'users' })
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.usersService.findAll();
  }
  // findAll() {
  //   return this.usersService.findAll();
  // }

  @Query(returns => User)
  findOne(@Args('username') username: string): Promise<User | null> {
    return this.usersService.findOne(username);
  }

  @Mutation(returns => User)
  createUser(@Args('createUserInput')createUserInput: CreateUserInput): Promise<User> {
    return this.usersService.create(createUserInput);
  }

}