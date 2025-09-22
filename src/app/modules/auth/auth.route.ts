import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { createUserZodSchema } from "../user/user.validation";
import { AuthControllers } from "./auth.controller";
import { loginSchema } from "./auth.validation";

const router = Router();

router.post(
  "/register",
  validateRequest(createUserZodSchema),
  AuthControllers.createUser
);

router.post(
  "/login",
  validateRequest(loginSchema),
  AuthControllers.loginWithCredentials
);

export const AuthRoutes = router;
