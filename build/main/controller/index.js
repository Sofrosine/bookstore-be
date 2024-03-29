"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newOrderController = exports.newUserController = exports.newBookController = exports.newAuthController = void 0;
var auth_controller_1 = require("./auth.controller");
Object.defineProperty(exports, "newAuthController", { enumerable: true, get: function () { return __importDefault(auth_controller_1).default; } });
var book_controller_1 = require("./book.controller");
Object.defineProperty(exports, "newBookController", { enumerable: true, get: function () { return __importDefault(book_controller_1).default; } });
var user_controller_1 = require("./user.controller");
Object.defineProperty(exports, "newUserController", { enumerable: true, get: function () { return __importDefault(user_controller_1).default; } });
var order_controller_1 = require("./order.controller");
Object.defineProperty(exports, "newOrderController", { enumerable: true, get: function () { return __importDefault(order_controller_1).default; } });
//# sourceMappingURL=index.js.map