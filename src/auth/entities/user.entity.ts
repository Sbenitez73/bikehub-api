import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity('users')
export class User {
    @ApiProperty()
    @ObjectIdColumn()
    id: string;

    @ApiProperty()
    @Column('text', { unique: true })
    username: string;

    @Column('text', { select: false })
    password: string;

    @ApiProperty()
    @Column('text', { unique: true })
    email: string;

    @ApiProperty()
    @Column('text')
    firstName: string;

    @ApiProperty()
    @Column('text')
    lastName: string;

    @ApiProperty()
    @Column('text')
    picture?: string;
}
