import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>
  ) 
  {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.userModel.create( createUserDto );
      return user;
    } catch (error) {
      if( error.code === 11000 ) throw new BadRequestException( `The user already exist` )
      throw new InternalServerErrorException( `Can't be create user` );
    }
  }

  async findAll() {
    return await this.userModel.find().exec();
  }

  async findOne(id: number) {
    return await this.userModel.findById(id).exec();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
