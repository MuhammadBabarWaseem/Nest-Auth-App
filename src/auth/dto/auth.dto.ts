/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
import { IsEmail, IsString, Length } from 'class-validator';
export class AuthDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(3,20, {message: 'Password has to be between 3 and 20 characters'})
    password: string;
}
