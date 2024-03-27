import { validate } from "class-validator";
import { User } from "src/main/entity/user";
import { ComparePassword, EncryptPassword } from "src/pkg/helpers/auth";
import { ResponseServiceType } from "src/pkg/helpers/response";
import { v4 } from "uuid";
import { UserRepositoryType } from "../repository/types";
import { AuthServiceType } from "./types";
import { LoginDto, RegisterDto } from "src/pkg/dto/auth.dto";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "src/pkg/config";

const newAuthService = (
  userRepository: UserRepositoryType
): AuthServiceType => {
  const Register = async (
    user: RegisterDto
  ): Promise<ResponseServiceType<User>> => {
    try {
      const userDto = new RegisterDto();
      userDto.name = user.name;
      userDto.email = user.email;
      userDto.password = user.password;

      const errors = await validate(userDto);
      if (errors.length > 0) {
        return {
          data: null,
          message: errors?.toString(),
          code: 400,
        };
      }

      const password = await EncryptPassword(user.password);
      const userData = await userRepository.Create({
        id: v4(),
        email: user.email,
        name: user.name,
        password,
      });

      return {
        data: userData,
        message: "User created successfully",
        code: 201,
      };
    } catch (error) {
      throw new Error(`Error post users: ${error.message}`);
    }
  };

  const Login = async (user: LoginDto): Promise<ResponseServiceType<User>> => {
    try {
      const userDto = new LoginDto();
      userDto.email = user.email;
      userDto.password = user.password;

      const errors = await validate(userDto);
      if (errors.length > 0) {
        return {
          data: null,
          message: errors?.toString(),
          code: 400,
        };
      }

      const userData = await userRepository.FindByEmail(user.email);
      if (!userData) {
        return {
          data: null,
          message: "User not found",
          code: 404,
        };
      }

      const isSame = await ComparePassword(userData?.password, user?.password);
      if (!isSame) {
        return {
          data: null,
          message: "Incorrect password",
          code: 401,
        };
      }

      const token = jwt.sign(
        { email: userData.email, id: userData.id },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      return {
        token,
        data: userData,
        message: "User login successfully",
        code: 200,
      };
    } catch (error) {
      throw new Error(`Error post users: ${error.message}`);
    }
  };

  return { Register, Login };
};

export default newAuthService;
