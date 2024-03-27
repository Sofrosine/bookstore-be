import { Book } from "../entity/book";
import { Order } from "../entity/order";
import { User } from "../entity/user";

export interface UserRepositoryType {
  List: () => Promise<User[]>;
  FindByEmail: (email: string) => Promise<User>;
  FindById: (id: string) => Promise<User>;
  Create: (user: User) => Promise<User>;
  UpdatePoint: (user: Partial<User>) => Promise<User | null>;
}

export interface BookRepositoryType {
  List: (limit: number, offset: number, searchText: string) => Promise<Book[]>;
  Count: () => Promise<number>;
  FindById: (id: string) => Promise<Book>;
  Create: (book: Book) => Promise<Book>;
}

export interface OrderRepositoryType {
  List: (userId: string, limit: number, offset: number) => Promise<Order[]>;
  Count: () => Promise<number>;
  FindById: (id: string) => Promise<Order>;
  FindByUserId: (userId: string) => Promise<Order>;
  Create: (order: Order) => Promise<Order>;
  Delete: (orderId: string) => Promise<void>;
}
