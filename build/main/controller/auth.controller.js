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
const response_1 = require("src/pkg/helpers/response");
const newAuthController = (authService) => {
    const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userDto = req.body;
            const response = yield authService.Register(userDto);
            (0, response_1.CustomResponse)(res, response);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
    const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const loginDto = req.body;
            const response = yield authService.Login(loginDto);
            (0, response_1.CustomResponseWithToken)(res, response);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
    return { Register, Login };
};
exports.default = newAuthController;
//# sourceMappingURL=auth.controller.js.map