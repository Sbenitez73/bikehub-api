import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @MinLength(5)
    username: string;
    @IsEmail()
    email: string;
    @IsString()
    @MinLength(3)
    firstName: string;
    @IsString()
    @MinLength(3)
    lastName: string;    
    picture: number;
}
