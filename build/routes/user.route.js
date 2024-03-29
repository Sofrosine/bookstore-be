"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("src/pkg/helpers/auth");
const userRouter = (app, userController) => {
    app.get("/users", auth_1.AuthenticateToken, userController.List);
    app.get("/users/me", auth_1.AuthenticateToken, userController.Me);
};
exports.default = userRouter;
//# sourceMappingURL=user.route.js.map