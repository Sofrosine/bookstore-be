import { Pool, QueryResult } from "pg";
import { Order } from "../entity/order";
import { OrderRepositoryType } from "./types";

const newOrderRepository = (pool: Pool): OrderRepositoryType => {
  const List = async (
    userId: string,
    limit: number,
    offset: number
  ): Promise<Order[]> => {
    const query = `
      SELECT o.id AS order_id, o.user_id, o.book_id, o.created_at,
             b.id AS book_id, b.title, b.writer, b.cover_image, b.point, b.tags
      FROM orders o
      JOIN books b ON o.book_id = b.id
      WHERE o.user_id = $1
      LIMIT $2 OFFSET $3`;
    const values = [userId, String(limit), String(offset)];
    const result: QueryResult = await pool.query(query, values);

    const orders: Order[] = result.rows.map((row: any) => {
      return {
        id: row.order_id,
        user_id: row.user_id,
        book_id: row.book_id,
        book: {
          id: row.book_id,
          title: row.title,
          writer: row.writer,
          cover_image: row.cover_image,
          point: row.point,
          tags: row.tags,
        },
        created_at: row.created_at,
      };
    });

    return orders;
  };

  const Count = async (): Promise<number> => {
    const query = "SELECT COUNT(*) FROM orders";
    const result: QueryResult = await pool.query(query);
    return parseInt(result.rows[0].count, 10); // Assuming count is returned as a string
  };

  const FindById = async (id: string): Promise<Order> => {
    const query = "SELECT * FROM orders WHERE id = $1";
    const result: QueryResult = await pool.query(query, [id]);
    return result.rows[0];
  };

  const FindByUserId = async (userId: string): Promise<Order> => {
    const query = "SELECT * FROM orders WHERE user_id = $1";
    const result: QueryResult = await pool.query(query, [userId]);
    return result.rows[0];
  };

  const Create = async (order: Order): Promise<Order> => {
    const { id, book_id, user_id } = order || {};
    const query =
      "INSERT INTO orders (id, book_id, user_id ) VALUES ($1, $2, $3) RETURNING *";
    const values = [id, book_id, user_id];
    const result: QueryResult = await pool.query(query, values);

    return result.rows[0];
  };

  const Delete = async (orderId: string): Promise<void> => {
    const query = "DELETE FROM orders WHERE id = $1";
    const values = [orderId];
    await pool.query(query, values);
  };

  return { List, Count, FindById, FindByUserId, Create, Delete };
};

export default newOrderRepository;
