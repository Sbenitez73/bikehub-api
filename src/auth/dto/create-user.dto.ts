import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @MinLength(5)
    @ApiProperty()
    username: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    @ApiProperty()
    password: string;

    @IsEmail()
    @ApiProperty()
    email: string;

    @IsString()
    @MinLength(3)
    @ApiProperty()
    firstName: string;

    @IsString()
    @MinLength(3)
    @ApiProperty()
    lastName: string;    
    
    @ApiProperty()
    @IsOptional()
    picture?: string;
}
