/* eslint-disable prettier/prettier */
import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import { AuthCredentialsDto } from './user-credentials.dto'
import { User } from './users.model';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>, 
                private jwtService: JwtService ) {}

    async signUp(userCredentials: AuthCredentialsDto) : Promise<void> {
        const {fullName, userName, email, password} = userCredentials;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new this.userModel({fullName: fullName, userName: userName, email: email, password: hashedPassword});

        try {
            await newUser.save();
        } catch (error) {
            if (error.code === 11000) {
                throw new ConflictException('User already exist');
            }
            throw error;
        }
        
    }

    async signIn(user: User) {
        const payload = {username: user.userName, sub: user._id };
        return {
            accessToken: this.jwtService.sign(payload),
        }
    }

    async validateUser(username: string, password: string): Promise<User> {
        const user = await this.userModel.findOne({ username });
    
        if (!user) {
          return null;
        }
    
        const valid = await bcrypt.compare(password, user.password);
    
        if (valid) {
          return user;
        }
    
        return null;
      }
}

    