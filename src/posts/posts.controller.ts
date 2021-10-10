/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';


@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) { }

    @Post()
    async createPost(
        @Body('user') user: string,
        @Body('title') title: string,
        @Body('content') content: string,
        @Body('status') status: string,
    )  {
        const generatePost = await this.postsService.insertPost(user, title, content, status);
        return {post: generatePost};
    }

    @Get()
    async getAllPosts() {
        const posts = await this.postsService.getPosts();
        return posts.map((post) => ({
            user: post.user,
            title: post.title,
            content: post.content
        }));
    }

    @Get(':user')
    async getUserPosts(@Param('user') postCreator: string,) {
        return await this.postsService.getUserPosts(postCreator);
    }

    @Get(':user/:postId')
    async getPost(@Param('user/:postId') postCreator: string,) {
        return await this.postsService.getUserPosts(postCreator);
    }

    @Patch(':user')
    async updatePost( @Param('user') postCreator: string,
                @Param('id') postId: string,
                @Body('title') postTitle: string,
                @Body('content') postContent: string,
                @Body('status') postStatus: string,
                @Body('dateCreated') postDateCreated: Date 
              ) {
                    await this.postsService.updatePost(postId, postCreator, postTitle, postContent, postStatus, postDateCreated);
                    return null;
    }

    @Delete(':id')
    deletePost(@Param('id') postId: string) {
        // this.postsService.deletePost(postId);
        // return null;
    }
}