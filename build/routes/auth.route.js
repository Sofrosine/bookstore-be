"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authRouter = (app, authController) => {
    app.post("/register", authController.Register);
    app.post("/login", authController.Login);
};
exports.default = authRouter;
//# sourceMappingURL=auth.route.js.map