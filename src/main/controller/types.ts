import { Request, Response } from "express";

export interface UserControllerType {
  List: (req: Request, res: Response) => Promise<void>;
  Me: (req: Request, res: Response) => Promise<void>;
}

export interface OrderControllerType {
  List: (req: Request, res: Response) => Promise<void>;
  Create: (req: Request, res: Response) => Promise<void>;
  Delete: (req: Request, res: Response) => Promise<void>;
}

export interface BookControllerType {
  List: (req: Request, res: Response) => Promise<void>;
  Create: (req: Request, res: Response) => Promise<void>;
}

export interface AuthControllerType {
  Register: (req: Request, res: Response) => Promise<void>;
  Login: (req: Request, res: Response) => Promise<void>;
}
