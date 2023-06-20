import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtPayload, UserLoginResponse, UserRegisterResponse } from './types';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserRegisterResponse> {
    try {
      const { password, ...userData } = createUserDto;

      const newUser = new this.userModel({
        password: bcrypt.hashSync(password, 10),
        ...userData,
      });

      await newUser.save();

      const { password: _, ...user } = newUser.toObject();

      return {
        user,
        token: this.getJWT({ id: newUser.id }),
      };
    } catch (error) {
      if (error.code === 11000)
        throw new BadRequestException(
          `User with email ${createUserDto.email} already exists`,
        );

      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async login(loginDto: LoginDto): Promise<UserLoginResponse> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });
    if (!user) throw new BadRequestException('Invalid credentials');

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) throw new BadRequestException('Invalid credentials');

    const { password: _, ...userData } = user.toObject();

    return {
      user: userData,
      token: this.getJWT({ id: user.id }),
    };
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    const { password, ...userData } = user.toObject();
    return userData;
  }

  getJWT(payload: JwtPayload): string {
    return this.jwtService.sign(payload);
  }
}
