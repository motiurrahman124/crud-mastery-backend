import { Schema, model } from 'mongoose';
import { TUser, TUserFullName, UserModel } from './user/user.interface';

const FullNameSchema = new Schema<TUserFullName>({
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
});

const userSchema = new Schema<TUser, UserModel>({
  userId: { type: Number, unique: true },
  username: { type: String, unique: true },
  password: { type: String },
  fullName: { type: FullNameSchema },
  age: { type: Number },
  email: { type: String },
  isActive: { type: Boolean },
  hobbies: { type: [String] },
});
