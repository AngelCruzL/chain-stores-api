import { IsNumber, IsString } from 'class-validator';

export class CreateStoreDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  phone: string;

  @IsString()
  description: string;

  @IsString()
  picture: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;
}
