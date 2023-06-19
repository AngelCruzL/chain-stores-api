import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { StoreModule } from './store/store.module';
import { JoiValidationSchema } from './config/joi-validation';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      validationSchema: JoiValidationSchema,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    StoreModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
