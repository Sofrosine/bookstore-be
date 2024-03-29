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
const newUserRepository = (pool) => {
    const List = () => __awaiter(void 0, void 0, void 0, function* () {
        const query = "SELECT * FROM users";
        const result = yield pool.query(query);
        return result.rows;
    });
    const FindByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const query = "SELECT * FROM users WHERE email = $1";
        const result = yield pool.query(query, [email]);
        return result.rows[0];
    });
    const FindById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const query = "SELECT * FROM users WHERE id = $1";
        const result = yield pool.query(query, [id]);
        return result.rows[0];
    });
    const Create = (user) => __awaiter(void 0, void 0, void 0, function* () {
        const { id, name, email, password } = user || {};
        const query = "INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4) RETURNING *";
        const values = [id, name, email, password];
        const result = yield pool.query(query, values);
        return result.rows[0];
    });
    const UpdatePoint = (user) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id, points } = user || {};
            const query = "UPDATE users SET points = $2 WHERE id = $1 RETURNING *";
            const values = [id, String(points)];
            const result = yield pool.query(query, values);
            return result.rows[0] || null;
        }
        catch (error) {
            // Handle errors here
            console.error("Error updating user:", error);
            return null;
        }
    });
    return { List, FindByEmail, FindById, Create, UpdatePoint };
};
exports.default = newUserRepository;
//# sourceMappingURL=user.repository.js.map