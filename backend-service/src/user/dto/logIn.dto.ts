import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsString()
    role?: string;
}
