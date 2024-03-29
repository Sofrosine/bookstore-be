"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const newOrderRepository = (pool) => {
    const List = (userId, limit, offset) => __awaiter(void 0, void 0, void 0, function* () {
        const query = `
      SELECT o.id AS order_id, o.user_id, o.book_id, o.created_at,
             b.id AS book_id, b.title, b.writer, b.cover_image, b.point, b.tags
      FROM orders o
      JOIN books b ON o.book_id = b.id
      WHERE o.user_id = $1
      LIMIT $2 OFFSET $3`;
        const values = [userId, String(limit), String(offset)];
        const result = yield pool.query(query, values);
        const orders = result.rows.map((row) => {
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
    });
    const Count = () => __awaiter(void 0, void 0, void 0, function* () {
        const query = "SELECT COUNT(*) FROM orders";
        const result = yield pool.query(query);
        return parseInt(result.rows[0].count, 10); // Assuming count is returned as a string
    });
    const FindById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const query = "SELECT * FROM orders WHERE id = $1";
        const result = yield pool.query(query, [id]);
        return result.rows[0];
    });
    const FindByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const query = "SELECT * FROM orders WHERE user_id = $1";
        const result = yield pool.query(query, [userId]);
        return result.rows[0];
    });
    const Create = (order) => __awaiter(void 0, void 0, void 0, function* () {
        const { id, book_id, user_id } = order || {};
        const query = "INSERT INTO orders (id, book_id, user_id ) VALUES ($1, $2, $3) RETURNING *";
        const values = [id, book_id, user_id];
        const result = yield pool.query(query, values);
        return result.rows[0];
    });
    const Delete = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
        const query = "DELETE FROM orders WHERE id = $1";
        const values = [orderId];
        yield pool.query(query, values);
    });
    return { List, Count, FindById, FindByUserId, Create, Delete };
};
exports.default = newOrderRepository;
//# sourceMappingURL=order.repository.js.map