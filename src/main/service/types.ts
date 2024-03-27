import { LoginDtoType, RegisterDtoType } from "src/pkg/dto/auth.dto";
import { BookDtoType } from "src/pkg/dto/book.dto";
import { ResponseServiceType } from "src/pkg/helpers/response";
import { Book } from "../entity/book";
import { User } from "../entity/user";
import { OrderDtoType } from "src/pkg/dto/order.dto";
import { Order } from "../entity/order";

export interface OrderServiceType {
  List: (
    userId: string,
    page: number,
    pageSize: number
  ) => Promise<ResponseServiceType<Order[]>>;
  Create: (orderDto: OrderDtoType) => Promise<ResponseServiceType<Order>>;
  Delete: (orderId: string) => Promise<ResponseServiceType<void>>;
}

export interface BookServiceType {
  List: (
    page: number,
    pageSize: number
  ) => Promise<ResponseServiceType<Book[]>>;
  Create: (bookDto: BookDtoType) => Promise<ResponseServiceType<Book>>;
}

export interface UserServiceType {
  List: () => Promise<User[]>;
  FindByEmail: (email: string) => Promise<User>;
}

export interface AuthServiceType {
  Register: (userDto: RegisterDtoType) => Promise<ResponseServiceType<User>>;
  Login: (userDto: LoginDtoType) => Promise<ResponseServiceType<User>>;
}
