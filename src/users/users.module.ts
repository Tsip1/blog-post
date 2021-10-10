/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import { UsersController } from './users.controller';
import { UserSchema } from './users.model';
import { UsersService } from './users.service';

//import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
    imports: [  ConfigModule.forRoot(),
                MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
                PassportModule,
                JwtModule.register({
                    secret: process.env.JWT_SECRET,
                    signOptions: {expiresIn: '60s'},
                }),
            ],
    controllers: [UsersController],
    providers: [UsersService, LocalStrategy, /*JwtStrategy*/]
})
export class UserModule {}

