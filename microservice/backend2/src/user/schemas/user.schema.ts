import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
  versionKey: false,
  toJSON: {
    virtuals: true,
    transform: (_doc, ret: Record<string, unknown>) => {
      delete ret._id;
      return ret;
    },
  },
})
export class User {
  @Prop({ required: true, maxlength: 100, trim: true })
  name: string;

  @Prop({ required: true, maxlength: 100, unique: true, lowercase: true })
  email: string;

  @Prop({ type: Number, min: 0 })
  age?: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
