"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newOrderRepository = exports.newUserRepository = exports.newBookRepository = void 0;
var book_repository_1 = require("./book.repository");
Object.defineProperty(exports, "newBookRepository", { enumerable: true, get: function () { return __importDefault(book_repository_1).default; } });
var user_repository_1 = require("./user.repository");
Object.defineProperty(exports, "newUserRepository", { enumerable: true, get: function () { return __importDefault(user_repository_1).default; } });
var order_repository_1 = require("./order.repository");
Object.defineProperty(exports, "newOrderRepository", { enumerable: true, get: function () { return __importDefault(order_repository_1).default; } });
//# sourceMappingURL=index.js.map