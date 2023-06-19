import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Store extends Document {
  @Prop({
    index: true,
    unique: true,
  })
  name: string;

  @Prop({
    unique: true,
  })
  address: string;

  @Prop()
  phone: string;

  @Prop()
  description: string;

  @Prop()
  picture: string;

  @Prop({ required: true })
  latitude: number;

  @Prop({ required: true })
  longitude: number;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
