import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { MessagesService } from './messages.service';
import { Message } from './entities/message.entity';
import { CreateMessageInput } from './dto/create-message.input';
import { UpdateMessageInput } from './dto/update-message.input';
import { User } from 'src/users/entities/user.entity';

@Resolver(() => Message)
export class MessagesResolver {
  constructor(private readonly messagesService: MessagesService) {}

  @Mutation(() => Message)
  createMessage(@Args('createMessageInput') createMessageInput: CreateMessageInput) {
    return this.messagesService.create(createMessageInput);
  }

  @Query(() => [Message], { name: 'messages' })
  findAll() {
    return this.messagesService.findAll();
  }

  @Query(() => Message, { name: 'message' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.messagesService.findOne(id);
  }
  
  @ResolveField(returns => User)
  user(@Parent() message: Message): Promise<User> {
    return this.messagesService.getUser(message.userId.toString());
  }

  @Mutation(() => Message)
  updateMessage(@Args('updateMessageInput') updateMessageInput: UpdateMessageInput) {
    return this.messagesService.update(updateMessageInput.id, updateMessageInput);
  }

  @Mutation(() => Message)
  removeMessage(@Args('id', { type: () => Int }) id: number) {
    return this.messagesService.remove(id);
  }
}
