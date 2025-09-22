import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { createUserZodSchema } from "../user/user.validation";
import { AuthControllers } from "./auth.controller";

const router = Router();

router.post(
  "/register",
  validateRequest(createUserZodSchema),
  AuthControllers.createUser
);

export const AuthRoutes = router;
