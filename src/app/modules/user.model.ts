import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

import {
  TUser,
  TUserAddress,
  TUserFullName,
  TUserOrders,
  UserModel,
} from './user/user.interface';
import config from '../config';

const FullNameSchema = new Schema<TUserFullName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
  },
});

const AddressSchema = new Schema<TUserAddress>({
  street: { type: String, required: [true, 'Street is required'] },
  city: { type: String, required: [true, 'City is required'] },
  country: { type: String, required: [true, 'Country is required'] },
});

const OrderSchema = new Schema<TUserOrders>({
  productName: { type: String },
  price: { type: Number },
  quantity: { type: Number },
});

const userSchema = new Schema<TUser, UserModel>({
  userId: {
    type: Number,
    unique: true,
    required: [true, 'User Id is required'],
  },
  username: {
    type: String,
    unique: true,
    required: [true, 'Username is required'],
  },
  password: { type: String, required: [true, 'Password is required'] },
  fullName: { type: FullNameSchema, required: [true, 'Full name is required'] },
  age: { type: Number, required: [true, 'Age is required'] },
  email: { type: String, required: [true, 'Email is required'] },
  isActive: { type: Boolean, required: [true, 'IsActive is required'] },
  hobbies: { type: [String], required: [true, 'Hobbies is required'] },
  address: { type: AddressSchema, required: [true, 'Address is required'] },
  orders: { type: [OrderSchema] },
});

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

export const User = model<TUser, UserModel>('User', userSchema);
