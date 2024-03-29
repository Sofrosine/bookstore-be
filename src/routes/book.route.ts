import { Express } from "express";
import { BookControllerType } from "src/main/controller/types";
import { AuthenticateToken } from "src/pkg/helpers/auth";

const bookRouter = (app: Express, bookController: BookControllerType) => {
  app.get("/books", AuthenticateToken, bookController.List);
  app.post("/books", bookController.Create);
};

export default bookRouter;
