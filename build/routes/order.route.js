"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("src/pkg/helpers/auth");
const orderRouter = (app, orderController) => {
    app.get("/orders", auth_1.AuthenticateToken, orderController.List);
    app.post("/orders", auth_1.AuthenticateToken, orderController.Create);
    app.delete("/orders/:id", auth_1.AuthenticateToken, orderController.Delete);
};
exports.default = orderRouter;
//# sourceMappingURL=order.route.js.map