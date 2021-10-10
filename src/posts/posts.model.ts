/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const PostSchema = new mongoose.Schema({
    user: {type: String, require: true},
    title: {type: String, require: true},
    content: {type: String, require: true},
    status: {   type: String,
                enum: ['Published', 'Drafted', 'WaitingForReview'],
                default: 'Drafted'
            },
    dateCreated:{  type: Date,
                    default: Date.now
                },
    lastUpdated: {  type: Date,
                    default: Date.now
                 }
});


export interface Post extends mongoose.Document {
        user: string;
        title: string;
        content: string;
        status: string;
        lastUpdated: Date;
        dateCreated: Date;
        id: string;
}