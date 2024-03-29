"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = exports.userRouter = exports.bookRouter = exports.authRouter = void 0;
var auth_route_1 = require("./auth.route");
Object.defineProperty(exports, "authRouter", { enumerable: true, get: function () { return __importDefault(auth_route_1).default; } });
var book_route_1 = require("./book.route");
Object.defineProperty(exports, "bookRouter", { enumerable: true, get: function () { return __importDefault(book_route_1).default; } });
var user_route_1 = require("./user.route");
Object.defineProperty(exports, "userRouter", { enumerable: true, get: function () { return __importDefault(user_route_1).default; } });
var order_route_1 = require("./order.route");
Object.defineProperty(exports, "orderRouter", { enumerable: true, get: function () { return __importDefault(order_route_1).default; } });
//# sourceMappingURL=index.js.map