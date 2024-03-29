"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newOrderService = exports.newBookService = exports.newAuthService = exports.newUserService = void 0;
var user_service_1 = require("./user.service");
Object.defineProperty(exports, "newUserService", { enumerable: true, get: function () { return __importDefault(user_service_1).default; } });
var auth_service_1 = require("./auth.service");
Object.defineProperty(exports, "newAuthService", { enumerable: true, get: function () { return __importDefault(auth_service_1).default; } });
var book_service_1 = require("./book.service");
Object.defineProperty(exports, "newBookService", { enumerable: true, get: function () { return __importDefault(book_service_1).default; } });
var order_service_1 = require("./order.service");
Object.defineProperty(exports, "newOrderService", { enumerable: true, get: function () { return __importDefault(order_service_1).default; } });
//# sourceMappingURL=index.js.map