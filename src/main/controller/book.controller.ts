import { Request, Response } from "express";
import { BookDtoType } from "src/pkg/dto/book.dto";
import {
  CustomResponse,
  CustomResponseWithPagination,
} from "src/pkg/helpers/response";
import { BookServiceType } from "../service/types";
import { BookControllerType } from "./types";
import { AuthenticatedRequest } from "src/pkg/helpers/auth";

const newBookController = (service: BookServiceType): BookControllerType => {
  const List = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const page = req.query.page ? parseInt(req.query.page as string) : 1;
      const pageSize = req.query.pageSize
        ? parseInt(req.query.pageSize as string)
        : 10;

      const response = await service.List(page, pageSize);

      CustomResponseWithPagination(res, response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const Create = async (req: Request, res: Response) => {
    try {
      const bookDto: BookDtoType = req.body;
      const response = await service.Create(bookDto);

      CustomResponse(res, response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  return { List, Create };
};

export default newBookController;
