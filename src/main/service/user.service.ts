import { User } from "src/main/entity/user";
import { UserRepositoryType } from "../repository/types";
import { UserServiceType } from "./types";

const newUserService = (
  userRepository: UserRepositoryType
): UserServiceType => {
  const List = async (): Promise<User[]> => {
    try {
      return await userRepository.List();
    } catch (error) {
      throw new Error(`Error getting all users: ${error.message}`);
    }
  };

  const FindByEmail = async (email: string): Promise<User> => {
    try {
      return await userRepository.FindByEmail(email);
    } catch (error) {
      throw new Error(`Error getting all users: ${error.message}`);
    }
  };

  return { List, FindByEmail };
};

export default newUserService;
