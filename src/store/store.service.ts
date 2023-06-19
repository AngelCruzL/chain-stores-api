import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';

import { Store } from './entities/store.entity';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Injectable()
export class StoreService {
  constructor(
    @InjectModel(Store.name)
    private readonly storeModel: Model<Store>,
  ) {}

  async create(createStoreDto: CreateStoreDto) {
    createStoreDto.name = createStoreDto.name.toLowerCase();
    createStoreDto.address = createStoreDto.address.toLowerCase();

    try {
      const store = await this.storeModel.create(createStoreDto);
      return store;
    } catch (error) {
      if (error.code === 11000)
        throw new BadRequestException(
          `Store already exists ${JSON.stringify(error.keyValue)}`,
        );

      console.log(error);
      throw new InternalServerErrorException(`Error creating store`);
    }
  }

  findAll() {
    return `This action returns all store`;
  }

  async findOne(searchTerm: string) {
    let store: Store;

    if (isValidObjectId(searchTerm))
      store = await this.storeModel.findById(searchTerm);

    if (!store) store = await this.storeModel.findOne({ name: searchTerm });

    if (!store) store = await this.storeModel.findOne({ address: searchTerm });

    if (!store)
      throw new NotFoundException(`Store not found with "${searchTerm}" term`);

    return store;
  }

  update(id: number, updateStoreDto: UpdateStoreDto) {
    return `This action updates a #${id} store`;
  }

  remove(id: number) {
    return `This action removes a #${id} store`;
  }
}
