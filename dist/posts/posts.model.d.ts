import * as mongoose from 'mongoose';
export declare const PostSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any>, {}>;
export interface Post extends mongoose.Document {
    user: string;
    title: string;
    content: string;
    status: string;
    lastUpdated: Date;
    dateCreated: Date;
    id: string;
}
