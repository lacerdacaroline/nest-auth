import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';


@Entity({ name: 'messages' })
@ObjectType()
export class Message {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  
  @Column({ name: 'user_id' })
  @Field()
  userId: number;

  
  @Column()
  @Field()
  content: string;

  
  @CreateDateColumn({ name: 'created_at' })
  @Field()
  createdAt: Date;

  
  @UpdateDateColumn({ name: 'updated_at' })
  @Field()
  updatedAt: Date;

  // @Field(() => User)
  // user: User;

  // Associations
  @ManyToOne(() => User, user => user.messages)
  // @JoinColumn({ name: 'user_id' })
  // userConnection: Promise<User>;
  @Field(type => User)
  user: User;
}