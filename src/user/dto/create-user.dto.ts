import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @MinLength(5)
    @ApiProperty()
    username: string;

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
    picture: number;
}
