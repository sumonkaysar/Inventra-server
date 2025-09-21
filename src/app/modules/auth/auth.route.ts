import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { createUserZodSchema } from "../user/user.validation";


const router = Router()

router.post("/register",validateRequest(createUserZodSchema) ,AuthControllers.createUser)

export const AuthRoutes = router