import { Router } from "express";
const router = Router();

const moduleRoutes = [
  //   {
  //     path: "/auth",
  //     route: AuthRoutes,
  //   },
  //   {
  //     path: "/users",
  //     route: UserRoutes,
  //   },
];

moduleRoutes.forEach(({ path, route }) => router.use(path, route));

export default router;
