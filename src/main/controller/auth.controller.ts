import { Request, Response } from "express";
import { LoginDtoType, RegisterDtoType } from "src/pkg/dto/auth.dto";
import {
  CustomResponse,
  CustomResponseWithToken,
} from "src/pkg/helpers/response";
import { AuthServiceType } from "../service/types";
import { AuthControllerType } from "./types";

const newAuthController = (
  authService: AuthServiceType
): AuthControllerType => {
  const Register = async (req: Request, res: Response) => {
    try {
      const userDto: RegisterDtoType = req.body;
      const response = await authService.Register(userDto);

      CustomResponse(res, response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const Login = async (req: Request, res: Response) => {
    try {
      const loginDto: LoginDtoType = req.body;
      const response = await authService.Login(loginDto);

      CustomResponseWithToken(res, response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  return { Register, Login };
};

export default newAuthController;
