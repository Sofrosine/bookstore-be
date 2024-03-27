import { validate } from "class-validator";
import { OrderDto, OrderDtoType } from "src/pkg/dto/order.dto";
import { ResponseServiceType } from "src/pkg/helpers/response";
import { v4 } from "uuid";
import { Order } from "../entity/order";
import {
  BookRepositoryType,
  OrderRepositoryType,
  UserRepositoryType,
} from "../repository/types";
import { OrderServiceType } from "./types";

const newOrderService = (
  orderRepository: OrderRepositoryType,
  bookRepository: BookRepositoryType,
  userRepository: UserRepositoryType
): OrderServiceType => {
  const List = async (
    userId: string,
    page: number,
    pageSize: number
  ): Promise<ResponseServiceType<Order[]>> => {
    try {
      const offset = (page - 1) * pageSize;
      const limit = pageSize;
      const orders = await orderRepository.List(userId, limit, offset);
      const counts = await orderRepository.Count();
      const totalPages = Math.ceil(counts / pageSize);

      return {
        data: orders,
        message: "Orders loaded successfully",
        code: 200,
        pagination: {
          page,
          pageSize,
          totalPages,
        },
      };
    } catch (error) {
      throw new Error(`Error getting all orders: ${error.message}`);
    }
  };

  const Create = async (
    orderDtoParam: OrderDtoType
  ): Promise<ResponseServiceType<Order>> => {
    try {
      const orderDto = new OrderDto();
      orderDto.book_id = orderDtoParam.book_id;

      const errors = await validate(orderDto);
      if (errors.length > 0) {
        return {
          data: null,
          message: errors?.toString(),
          code: 400,
        };
      }

      const bookData = await bookRepository.FindById(orderDto.book_id);

      const userData = await userRepository.FindById(orderDtoParam?.user_id);

      await userRepository.UpdatePoint({
        id: orderDtoParam?.user_id,
        points: Number(userData?.points) - Number(bookData?.point),
      });

      const orderData = await orderRepository.Create({
        id: v4(),
        book_id: orderDto.book_id,
        user_id: orderDtoParam?.user_id,
      });

      return {
        data: orderData,
        message: "Order created successfully",
        code: 201,
      };
    } catch (error) {
      throw new Error(`Error creating order: ${error.message}`);
    }
  };

  const Delete = async (
    orderId: string
  ): Promise<ResponseServiceType<void>> => {
    try {
      const orderData = await orderRepository.FindById(orderId);
      const bookData = await bookRepository.FindById(orderData?.book_id);
      const userData = await userRepository.FindById(orderData?.user_id);

      await userRepository.UpdatePoint({
        id: userData?.id,
        points: Number(userData?.points) + Number(bookData?.point),
      });

      await orderRepository.Delete(orderId);

      return {
        data: null,
        message: "Order deleted successfully",
        code: 200,
      };
    } catch (error) {
      throw new Error(`Error creating order: ${error.message}`);
    }
  };

  return { List, Create, Delete };
};

export default newOrderService;
