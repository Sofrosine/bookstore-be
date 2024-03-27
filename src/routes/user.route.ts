import { Express } from "express";
import { UserControllerType } from "src/main/controller/types";
import { AuthenticateToken } from "src/pkg/helpers/auth";

const userRouter = (app: Express, userController: UserControllerType) => {
  app.get("/users", AuthenticateToken, userController.List);
  app.get("/users/me", AuthenticateToken, userController.Me);
};

export default userRouter;
