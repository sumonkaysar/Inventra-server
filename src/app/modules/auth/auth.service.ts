import bcryptjs from "bcryptjs";
import envConfig from "../../config/env.config";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "../../utils/httpStatus";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { generateToken } from "../../utils/jwt";

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
const loginWithCredentials = async (email: string, password: string) => {
  const isExists = await User.findOne({ email });

  if (!isExists) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const isPasswordMatch = await bcryptjs.compare(password, isExists.password);

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid credentials");
  }

  if (isExists.isTwoFactorEnabled) {
    // TODO:-> Add 2FA

    return {
      user: null,
      required2FA: true,
    };
  } else {
    const accessToken = generateToken(
      { id: isExists._id, email: isExists.email, role: isExists.role },
      envConfig.JWT_SECRET,
      envConfig.JWT_EXPIRES_IN
    );
    const refreshToken = generateToken(
      { id: isExists._id, email: isExists.email, role: isExists.role },
      envConfig.JWT_SECRET,
      envConfig.JWT_REFRESH_EXPIRES_IN
    );

    const { password, ...user } = isExists.toObject();

    return {
      required2FA: false,
      user,
      accessToken,
      refreshToken,
    };
  }
};

export const AuthServices = {
  createUser,
  loginWithCredentials,
};
