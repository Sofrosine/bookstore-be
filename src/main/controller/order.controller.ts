import { Request, Response } from "express";
import { OrderDtoType } from "src/pkg/dto/order.dto";
import { AuthenticatedRequest } from "src/pkg/helpers/auth";
import {
  CustomResponse,
  CustomResponseWithPagination,
} from "src/pkg/helpers/response";
import { OrderServiceType } from "../service/types";
import { OrderControllerType } from "./types";

const newOrderController = (service: OrderServiceType): OrderControllerType => {
  const List = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const page = req.query.page ? parseInt(req.query.page as string) : 1;
      const pageSize = req.query.pageSize
        ? parseInt(req.query.pageSize as string)
        : 10;

      const response = await service.List(req.user?.id, page, pageSize);

      CustomResponseWithPagination(res, response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const Create = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const orderDto: OrderDtoType = req.body;
      orderDto.user_id = req.user?.id;
      const response = await service.Create(orderDto);

      CustomResponse(res, response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const Delete = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const orderId = req.params?.id;
      const response = await service.Delete(orderId);

      CustomResponse(res, response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  return { List, Create, Delete };
};

export default newOrderController;
