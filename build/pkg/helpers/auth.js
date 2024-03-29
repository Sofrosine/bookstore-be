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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComparePassword = exports.EncryptPassword = exports.AuthenticateToken = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const response_1 = require("./response");
const AuthenticateToken = (req, res, next) => {
    var _a;
    // Get the JWT token from the request headers or query parameters
    const token = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) || req.query.token;
    if (!token) {
        return (0, response_1.CustomResponse)(res, {
            code: 401,
            message: "Authentication failed: Token not provided",
            data: null,
        });
    }
    try {
        // Verify the token and extract claims
        const decoded = jsonwebtoken_1.default.verify(String(token), config_1.JWT_SECRET);
        req["user"] = decoded; // Add claims to request object
        next(); // Move to the next middleware or route handler
    }
    catch (error) {
        return (0, response_1.CustomResponse)(res, {
            code: 401,
            message: "Authentication failed: Invalid token",
            data: null,
        });
    }
};
exports.AuthenticateToken = AuthenticateToken;
const EncryptPassword = (text) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hash = yield bcrypt_1.default.hash(text, 10); // Using bcrypt with a salt round of 10
        return hash;
    }
    catch (error) {
        throw new Error("Error encrypting password");
    }
});
exports.EncryptPassword = EncryptPassword;
const ComparePassword = (hashedPassword, plainPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield bcrypt_1.default.compare(plainPassword, hashedPassword);
    }
    catch (error) {
        throw new Error("Error comparing passwords");
    }
});
exports.ComparePassword = ComparePassword;
//# sourceMappingURL=auth.js.map