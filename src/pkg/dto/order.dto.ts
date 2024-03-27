import { IsArray, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class OrderDto {
  @IsNotEmpty()
  @IsString()
  book_id: string;
}

export interface OrderDtoType {
  user_id: string;
  book_id: string;
}
