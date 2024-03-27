import { Pool, QueryResult } from "pg";
import { Book } from "../entity/book";
import { BookRepositoryType } from "./types";

const newBookRepository = (pool: Pool): BookRepositoryType => {
  const List = async (limit: number, offset: number): Promise<Book[]> => {
    const query = "SELECT * FROM books LIMIT $1 OFFSET $2";
    const values = [limit, offset];
    const result: QueryResult = await pool.query(query, values);
    return result.rows;
  };

  const Count = async (): Promise<number> => {
    const query = "SELECT COUNT(*) FROM books";
    const result: QueryResult = await pool.query(query);
    return parseInt(result.rows[0].count, 10); // Assuming count is returned as a string
  };

  const FindById = async (id: string): Promise<Book> => {
    const query = "SELECT * FROM books WHERE id = $1";
    const result: QueryResult = await pool.query(query, [id]);
    return result.rows[0];
  };

  const Create = async (book: Book): Promise<Book> => {
    const { id, title, writer, point, tags, cover_image } = book || {};
    const query =
      "INSERT INTO books (id, title, writer, point, tags, cover_image ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
    const values = [
      id,
      title,
      writer,
      point?.toString(),
      tags?.toString(),
      "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
    ];
    const result: QueryResult = await pool.query(query, values);

    return result.rows[0];
  };

  return { List, Count, FindById, Create };
};

export default newBookRepository;
