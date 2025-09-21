 
import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { AuthServices } from "./auth.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "../../utils/httpStatus";



const createUser = catchAsync(async(req: Request, res: Response) => {
    const user = await AuthServices.createUser(req.body)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Created Successfully",
        data: user
    })
})


export const AuthControllers = {
    createUser
}