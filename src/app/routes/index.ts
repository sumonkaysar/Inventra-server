/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
const router = Router();

const moduleRoutes: any[] = [
    {
      path: "/auth",
      route: AuthRoutes,
    },
  //   {
  //     path: "/users",
  //     route: UserRoutes,
  //   },
];

moduleRoutes.forEach(({ path, route }) => router.use(path, route));

export default router;
