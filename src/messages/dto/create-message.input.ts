import { Field, InputType } from '@nestjs/graphql';
import { CreateUserInput } from 'src/users/dto/create-user.input';

@InputType()
export class CreateMessageInput {
  @Field()
  readonly id: number;
}

// @InputType()
// class MessageUserInput { // o que é necessário para criar uma mensagem 
//   @Field({nullable: true})
//   readonly connect: MessageUserConnectInput;

//   @Field({nullable: true})
//   readonly create: UserInput;
// }

@InputType()
export default class MessageInput {
  @Field()
  readonly content: string;

  @Field()
  readonly userId: number;
}

@InputType()
export class DeleteMessageInput {
  @Field()
  readonly id: number;

  @Field()
  readonly userId: number;
}
