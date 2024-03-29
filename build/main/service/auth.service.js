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
const class_validator_1 = require("class-validator");
const auth_1 = require("src/pkg/helpers/auth");
const uuid_1 = require("uuid");
const auth_dto_1 = require("src/pkg/dto/auth.dto");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("src/pkg/config");
const newAuthService = (userRepository) => {
    const Register = (user) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userDto = new auth_dto_1.RegisterDto();
            userDto.name = user.name;
            userDto.email = user.email;
            userDto.password = user.password;
            const errors = yield (0, class_validator_1.validate)(userDto);
            if (errors.length > 0) {
                return {
                    data: null,
                    message: errors === null || errors === void 0 ? void 0 : errors.toString(),
                    code: 400,
                };
            }
            const password = yield (0, auth_1.EncryptPassword)(user.password);
            const userData = yield userRepository.Create({
                id: (0, uuid_1.v4)(),
                email: user.email,
                name: user.name,
                password,
            });
            return {
                data: userData,
                message: "User created successfully",
                code: 201,
            };
        }
        catch (error) {
            throw new Error(`Error post users: ${error.message}`);
        }
    });
    const Login = (user) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userDto = new auth_dto_1.LoginDto();
            userDto.email = user.email;
            userDto.password = user.password;
            const errors = yield (0, class_validator_1.validate)(userDto);
            if (errors.length > 0) {
                return {
                    data: null,
                    message: errors === null || errors === void 0 ? void 0 : errors.toString(),
                    code: 400,
                };
            }
            const userData = yield userRepository.FindByEmail(user.email);
            if (!userData) {
                return {
                    data: null,
                    message: "User not found",
                    code: 404,
                };
            }
            const isSame = yield (0, auth_1.ComparePassword)(userData === null || userData === void 0 ? void 0 : userData.password, user === null || user === void 0 ? void 0 : user.password);
            if (!isSame) {
                return {
                    data: null,
                    message: "Incorrect password",
                    code: 401,
                };
            }
            const token = jsonwebtoken_1.default.sign({ email: userData.email, id: userData.id }, config_1.JWT_SECRET, { expiresIn: "1h" });
            return {
                token,
                data: userData,
                message: "User login successfully",
                code: 200,
            };
        }
        catch (error) {
            throw new Error(`Error post users: ${error.message}`);
        }
    });
    return { Register, Login };
};
exports.default = newAuthService;
//# sourceMappingURL=auth.service.js.map