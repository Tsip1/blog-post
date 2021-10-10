/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, ValidationPipe, Request, UseGuards} from '@nestjs/common';
import { AuthCredentialsDto } from './user-credentials.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('/signup')
    async signUp(@Body(ValidationPipe) userCredentials: AuthCredentialsDto) : Promise<void> {
        return await this.usersService.signUp(userCredentials);
    }

    @UseGuards(LocalAuthGuard)
    @Post('/signin')
    async signIn(@Request() req) {
        return this.usersService.signIn(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    getMe(@Request() req) {
     return req.user;
    }
}