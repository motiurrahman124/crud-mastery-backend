import { User } from '../user.model';
import { TUser, TUserOrders } from './user.interface';

const createUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error('User already exists!');
  }
  const result = await User.create(userData);

  const resultWithoutPassword: unknown = {
    ...result.toObject(),
    password: undefined,
  };

  return resultWithoutPassword;
};

const getAllUsersFromDB = async () => {
  const result = await User.find(
    {},
    { username: 1, fullName: 1, age: 1, email: 1, address: 1 },
  );
  return result;
};

const getSingleUserFromDB = async (userId: number) => {
  const result = await User.aggregate([
    { $match: { userId } },
    {
      $project: {
        userId: 1,
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        isActive: 1,
        hobbies: 1,
        address: 1,
        orders: 1,
      },
    },
  ]);
  return result;
};

const updateUserIntoDB = async (userData: TUser, userId: number) => {
  const result = await User.findOneAndUpdate({ userId }, userData, {
    new: true,
  });
  return result;
};

const deleteUserFromDB = async (userId: number) => {
  const result = await User.deleteOne({ userId });
  return result;
};

const addNewProductIntoDB = async (
  productData: TUserOrders,
  userId: number,
) => {
  const result = await User.findOneAndUpdate(
    { userId },
    { $push: { orders: productData } },
    { new: true },
  );
  return result;
};

const getUserOrdersFromDB = async (userId: number) => {
  const result = await User.aggregate([
    { $match: { userId } },
    { $project: { orders: 1 } },
  ]);
  return result;
};

const calculateOrderPriceFromDB = async (userId: number) => {
  const result = await User.aggregate([
    { $match: { userId } },
    { $unwind: '$orders' },
    {
      $group: {
        _id: null,
        totalPrice: {
          $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
        },
      },
    },
    { $project: { _id: 0, totalPrice: 1 } },
  ]);
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
  addNewProductIntoDB,
  getUserOrdersFromDB,
  calculateOrderPriceFromDB,
};
