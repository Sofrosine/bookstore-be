"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApp = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const routes_1 = require("./routes");
const database_1 = __importDefault(require("./pkg/config/database"));
const repository_1 = require("./main/repository");
const service_1 = require("./main/service");
const controller_1 = require("./main/controller");
const getApp = () => {
    const app = (0, express_1.default)();
    const pool = (0, database_1.default)();
    const upload = (0, multer_1.default)();
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use(upload.none());
    app.disable("x-powered-by");
    app.use((0, cors_1.default)());
    const userRepository = (0, repository_1.newUserRepository)(pool);
    const userService = (0, service_1.newUserService)(userRepository);
    const userController = (0, controller_1.newUserController)(userService);
    const bookRepository = (0, repository_1.newBookRepository)(pool);
    const bookService = (0, service_1.newBookService)(bookRepository);
    const bookController = (0, controller_1.newBookController)(bookService);
    const orderRepository = (0, repository_1.newOrderRepository)(pool);
    const orderService = (0, service_1.newOrderService)(orderRepository, bookRepository, userRepository);
    const orderController = (0, controller_1.newOrderController)(orderService);
    const authService = (0, service_1.newAuthService)(userRepository);
    const authController = (0, controller_1.newAuthController)(authService);
    (0, routes_1.userRouter)(app, userController);
    (0, routes_1.authRouter)(app, authController);
    (0, routes_1.bookRouter)(app, bookController);
    (0, routes_1.orderRouter)(app, orderController);
    // Handle 404 not found
    app.use(function (req, res) {
        return res.status(404).json({
            ok: false,
            code: 404,
            message: "Not Found",
        });
    });
    return app;
};
exports.getApp = getApp;
//# sourceMappingURL=app.js.map