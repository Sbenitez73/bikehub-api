import { BadRequestException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, LoginUserDto } from './dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('UserService');
  
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>
  ) {}

  public async create(request: CreateUserDto): Promise<User> {
    try {
      const user = this.userRepository.create( this.encryptPassword( request ));
      await this.userRepository.save( user );

      return user;
    } 
    catch (error) {
      console.log( 'err', error );
      this.logger.error( error );
      if( error.code === 11000 ) throw new BadRequestException( `The user already exist` )
      throw new InternalServerErrorException( `Can't be create user` );
    }
  }

  public async login( request: LoginUserDto ) {
    const { username, password } = request;
    const user = await this.userRepository.findOne({ 
      where: { username },
      select: { username: true, password: true }
    });

    if( !user || !bcrypt.compareSync( password, user.password ) ) throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  private encryptPassword( request: CreateUserDto ): CreateUserDto {
    const { password, ...userData } = request;
    return  {
      ...userData,
      password: bcrypt.hashSync( password, 10 )
    }
      
  }
}
