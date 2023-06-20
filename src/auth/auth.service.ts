import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { password, ...userData } = createUserDto;

      const newUser = new this.userModel({
        password: bcrypt.hashSync(password, 10),
        ...userData,
      });

      await newUser.save();

      const { password: _, ...user } = newUser.toObject();

      return user;
    } catch (error) {
      if (error.code === 11000)
        throw new BadRequestException(
          `User with email ${createUserDto.email} already exists`,
        );

      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
