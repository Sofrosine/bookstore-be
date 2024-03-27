import bodyParser from "body-parser";
import cors from "cors";
import express, {
  Application,
  Express,
  Request,
  Response,
  Router,
} from "express";
import multer from "multer";
import { authRouter, bookRouter, orderRouter, userRouter } from "./routes";
import database from "./pkg/config/database";
import {
  newBookRepository,
  newOrderRepository,
  newUserRepository,
} from "./main/repository";
import {
  newAuthService,
  newBookService,
  newOrderService,
  newUserService,
} from "./main/service";
import {
  newAuthController,
  newBookController,
  newOrderController,
  newUserController,
} from "./main/controller";

export const getApp = (): Application => {
  const app: Express = express();

  const pool = database();
  const upload = multer();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(upload.none());

  app.disable("x-powered-by");

  app.use(cors());

  const userRepository = newUserRepository(pool);
  const userService = newUserService(userRepository);
  const userController = newUserController(userService);

  const bookRepository = newBookRepository(pool);
  const bookService = newBookService(bookRepository);
  const bookController = newBookController(bookService);

  const orderRepository = newOrderRepository(pool);
  const orderService = newOrderService(
    orderRepository,
    bookRepository,
    userRepository
  );
  const orderController = newOrderController(orderService);

  const authService = newAuthService(userRepository);
  const authController = newAuthController(authService);

  userRouter(app, userController);
  authRouter(app, authController);
  bookRouter(app, bookController);
  orderRouter(app, orderController);

  // Handle 404 not found
  app.use(function (req: Request, res: Response): Response {
    return res.status(404).json({
      ok: false,
      code: 404,
      message: "Not Found",
    });
  });

  return app;
};
