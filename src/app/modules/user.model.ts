import { Schema, model } from 'mongoose';
import {
  TUser,
  TUserAddress,
  TUserFullName,
  TUserOrders,
  UserModel,
} from './user/user.interface';

const FullNameSchema = new Schema<TUserFullName>({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
});

const AddressSchema = new Schema<TUserAddress>({
  street: { type: String },
  city: { type: String },
  country: { type: String },
});

const OrderSchema = new Schema<TUserOrders>({
  productName: { type: String },
  price: { type: Number },
  quantity: { type: Number },
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
  address: { type: AddressSchema },
  orders: { type: OrderSchema },
});

userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

export const User = model<TUser, UserModel>('User', userSchema);
