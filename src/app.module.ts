/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './posts/post.module';
import { UserModule } from './users/users.module';

@Module({
  imports: [PostModule, 
            UserModule,
            MongooseModule.forRoot('mongodb+srv://tsipora:OSnJEH3QqwIAlw7c@cluster0.xhk4p.mongodb.net/blog-post?retryWrites=true&w=majority',),
            // ConfigModule.forRoot({
            //   isGlobal: true,
            // })
          ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
