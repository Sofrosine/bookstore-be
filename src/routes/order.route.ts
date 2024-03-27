import { Express } from "express";
import { OrderControllerType } from "src/main/controller/types";
import { AuthenticateToken } from "src/pkg/helpers/auth";

const orderRouter = (app: Express, orderController: OrderControllerType) => {
  app.get("/orders", AuthenticateToken, orderController.List);
  app.post("/orders", AuthenticateToken, orderController.Create);
  app.delete("/orders/:id", AuthenticateToken, orderController.Delete);
};

export default orderRouter;
