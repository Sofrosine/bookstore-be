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
const newBookRepository = (pool) => {
    const List = (limit, offset, searchText) => __awaiter(void 0, void 0, void 0, function* () {
        let query = "SELECT * FROM books WHERE title ILIKE '%'||$1||'%' LIMIT $2 OFFSET $3";
        const values = [searchText !== null && searchText !== void 0 ? searchText : "", String(limit), String(offset)];
        const result = yield pool.query(query, values);
        return result.rows;
    });
    const Count = () => __awaiter(void 0, void 0, void 0, function* () {
        const query = "SELECT COUNT(*) FROM books";
        const result = yield pool.query(query);
        return parseInt(result.rows[0].count, 10); // Assuming count is returned as a string
    });
    const FindById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const query = "SELECT * FROM books WHERE id = $1";
        const result = yield pool.query(query, [id]);
        return result.rows[0];
    });
    const Create = (book) => __awaiter(void 0, void 0, void 0, function* () {
        const { id, title, writer, point, tags, cover_image } = book || {};
        const query = "INSERT INTO books (id, title, writer, point, tags, cover_image ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
        const values = [
            id,
            title,
            writer,
            point === null || point === void 0 ? void 0 : point.toString(),
            tags === null || tags === void 0 ? void 0 : tags.toString(),
            "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
        ];
        const result = yield pool.query(query, values);
        return result.rows[0];
    });
    return { List, Count, FindById, Create };
};
exports.default = newBookRepository;
//# sourceMappingURL=book.repository.js.map