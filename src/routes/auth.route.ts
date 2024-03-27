import { Express } from "express";
import { AuthControllerType } from "src/main/controller/types";

const authRouter = (app: Express, authController: AuthControllerType) => {
  app.post("/register", authController.Register);
  app.post("/login", authController.Login);
};

export default authRouter;
