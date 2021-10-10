/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
import {IsString, MaxLength, MinLength, IsEmail, IsNotEmpty } from 'class-validator';


export const UserSchema = new mongoose.Schema({
    fullName: {type: String, require: true},
    userName: {type: String, require: true, unique: true},
    email: {type: String, require: true},
    password: {type: String, require: true}
});


export interface User extends mongoose.Document {
        fullname: string;
        userName: string;
        email: string;
        password: string;
}