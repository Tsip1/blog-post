/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Post } from './posts.model';

@Injectable()
export class PostsService {
    private posts: Post[] = [];

    constructor(@InjectModel('Post')private readonly postModel: Model<Post>, ) {}

    async insertPost(user: string, title:string, content: string, status: string) {
        const newPost = new this.postModel({user: user, title: title, content: content, status: status});

        newPost.lastUpdated = new Date();
        newPost.dateCreated = new Date();

        const res = await newPost.save();
        return res.id as string;
    }

    async getPost(id) {
        console.log("in get post");
        const userPosts = await this.findPost(id);
        return userPosts;
    }

    async getUserPosts(user: string) {
        const userPosts = await this.findUserPosts(user);
        return userPosts;
    }

    async getPosts() {
        const posts = await this.postModel.find().limit(10).exec();
        return posts as Post[];
    }

    async updatePost(id, user: string, title: string, content: string, status: string, dateCreated: Date) {
        const updatePost = await this.findPost(id);

        if(title){
            updatePost.title = title;
        }
        if(content) {
            updatePost.content = content;
        }
        if(status) {
            updatePost.status = status;
        }
        updatePost.lastUpdated = new Date();
        
        updatePost.save();
    }

    async deletePost(id) {
        const deletedPost = await this.postModel
            .findByIdAndRemove(id);
        //return deletedPost;
    }


    private async findUserPosts(user: string): Promise<Post> {
        let post;
        try {
            post = await this.postModel.find({user: user},{}).limit(10).exec();   
        } catch (error) {
            throw new NotFoundException('This user has no posts...');
        }
        if (post.length < 1) {
            throw new NotFoundException('This user has no posts...')
        }
        return post;
    }

    private async findPost(id): Promise<Post> {
        let post;
        console.log("here");
        try {
            post = await this.postModel.findById(id).exec();
            console.log(post)   
        } catch (error) {
            throw new NotFoundException('could not find any post...');
        }
        if (post.length < 1) {
            throw new NotFoundException('could not find any post...')
        }
        return post;
    }
}