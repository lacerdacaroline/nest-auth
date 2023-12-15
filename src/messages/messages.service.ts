import { Injectable } from '@nestjs/common';
import { CreateMessageInput } from './dto/create-message.input';
import { UpdateMessageInput } from './dto/update-message.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from '../messages/entities/message.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class MessagesService {
  constructor(@InjectRepository(Message) private messagesRepository: Repository<Message>, private usersService: UsersService) {}

  create(createMessageInput: CreateMessageInput) {
    const newMessage = this.messagesRepository.create(createMessageInput);
    return this.messagesRepository.save(newMessage);
  }

  findAll() {
    return this.messagesRepository.find();
  }

  findOne(id: number) {
    return this.messagesRepository.findOneOrFail({ where: { id } });
  }

  getUser(userId: string): Promise<User> {
    return this.usersService.findOne(userId);
  }


  update(id: number, updateMessageInput: UpdateMessageInput) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
