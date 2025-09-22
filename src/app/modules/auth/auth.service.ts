import bcryptjs from "bcryptjs";
import envConfig from "../../config/env.config";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "../../utils/httpStatus";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";

const createUser = async (payload: Partial<IUser>) => {
  const { fullName, email, password, ...rest } = payload;

  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Already Exist");
  }

  const hashedPassword = await bcryptjs.hash(
    password as string,
    Number(envConfig.BCRYPTJS_SALT_ROUND)
  );

  const user = await User.create({
    fullName,
    email,
    password: hashedPassword,
    ...rest,
  });

  return user;
};

export const AuthServices = {
  createUser,
};
