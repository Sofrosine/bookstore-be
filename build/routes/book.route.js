"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("src/pkg/helpers/auth");
const bookRouter = (app, bookController) => {
    app.get("/books", auth_1.AuthenticateToken, bookController.List);
    app.post("/books", bookController.Create);
};
exports.default = bookRouter;
//# sourceMappingURL=book.route.js.map