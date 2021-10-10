/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PostsController } from './posts.controller';
import { PostSchema } from './posts.model';
import { PostsService } from './posts.service';

@Module({
    imports: [MongooseModule.forFeature([{name: 'Post', schema: PostSchema}])],
    controllers: [PostsController],
    providers: [PostsService]
})

export class PostModule {}