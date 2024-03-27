import { Pool, QueryResult } from "pg";
import { User } from "src/main/entity/user";
import { UserRepositoryType } from "./types";

const newUserRepository = (pool: Pool): UserRepositoryType => {
  const List = async (): Promise<User[]> => {
    const query = "SELECT * FROM users";
    const result: QueryResult = await pool.query(query);
    return result.rows;
  };

  const FindByEmail = async (email: string): Promise<User> => {
    const query = "SELECT * FROM users WHERE email = $1";
    const result: QueryResult = await pool.query(query, [email]);
    return result.rows[0];
  };

  const FindById = async (id: string): Promise<User> => {
    const query = "SELECT * FROM users WHERE id = $1";
    const result: QueryResult = await pool.query(query, [id]);
    return result.rows[0];
  };

  const Create = async (user: User): Promise<User> => {
    const { id, name, email, password } = user || {};
    const query =
      "INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [id, name, email, password];
    const result: QueryResult = await pool.query(query, values);
    return result.rows[0];
  };

  const UpdatePoint = async (user: User): Promise<User | null> => {
    try {
      const { id, points } = user || {};
      const query = "UPDATE users SET points = $2 WHERE id = $1 RETURNING *";
      const values = [id, String(points)];
      const result: QueryResult = await pool.query(query, values);
      return result.rows[0] || null;
    } catch (error) {
      // Handle errors here
      console.error("Error updating user:", error);
      return null;
    }
  };

  return { List, FindByEmail, FindById, Create, UpdatePoint };
};

export default newUserRepository;
