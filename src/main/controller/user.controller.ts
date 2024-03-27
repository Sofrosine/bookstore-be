import { Request, Response } from "express";
import { UserServiceType } from "../service/types";
import { UserControllerType } from "./types";
import { AuthenticatedRequest } from "src/pkg/helpers/auth";

const newUserController = (service: UserServiceType): UserControllerType => {
  const List = async (req: Request, res: Response) => {
    try {
      const users = await service.List();
      res.json({
        data: users,
        message: "Success",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const Me = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const users = await service.FindByEmail(req.user?.email);
      res.json({
        data: users,
        message: "Success",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  return { List, Me };
};

export default newUserController;
