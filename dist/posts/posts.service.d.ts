import { Model } from 'mongoose';
import { Post } from './posts.model';
export declare class PostsService {
    private readonly postModel;
    private posts;
    constructor(postModel: Model<Post>);
    insertPost(user: string, title: string, content: string, status: string): Promise<string>;
    getPost(id: any): Promise<Post>;
    getUserPosts(user: string): Promise<Post>;
    getPosts(): Promise<Post[]>;
    updatePost(id: any, user: string, title: string, content: string, status: string, dateCreated: Date): Promise<void>;
    deletePost(id: any): Promise<void>;
    private findUserPosts;
    private findPost;
}
