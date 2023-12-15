import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesModule } from './messages/messages.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    sortSchema: true,
  }), 
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'data.project.db',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),
  UsersModule, AuthModule, MessagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
