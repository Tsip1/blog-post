/* eslint-disable prettier/prettier */
import {IsString, MaxLength, MinLength, IsEmail, IsNotEmpty } from 'class-validator';

export class AuthCredentialsDto {
    @IsString()
    fullName: string;

    @IsString()
    @MinLength(4)
    @MaxLength(12)
    userName: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8, {message: 'Password is too short (minimum 8 characters'})
    @MaxLength(20, {message: 'Password is too long (maximum 20 characters'})
    password: string;


}
