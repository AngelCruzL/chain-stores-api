import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { StoreModule } from './store/store.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/chain_stores'),
    StoreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
