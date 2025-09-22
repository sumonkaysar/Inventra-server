import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import httpStatus from "../../utils/httpStatus";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";
import { LoginSchema } from "./auth.validation";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = await AuthServices.createUser(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User Created Successfully",
    data: user,
  });
});

const loginWithCredentials = catchAsync(async (req, res, next) => {
  const { email, password }: LoginSchema = req.body;
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: await AuthServices.loginWithCredentials(email, password),
  });
});

export const AuthControllers = {
  createUser,
  loginWithCredentials,
};
