import { User } from '../entities/user.entity';

export type UserLoginResponse = {
  user: User;
  token: string;
};

export type UserRegisterResponse = UserLoginResponse;
