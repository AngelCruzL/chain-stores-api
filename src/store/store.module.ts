import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { Store, StoreSchema } from './entities/store.entity';

@Module({
  controllers: [StoreController],
  providers: [StoreService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Store.name,
        schema: StoreSchema,
      },
    ]),
  ],
})
export class StoreModule {}
