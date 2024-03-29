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
const newUserService = (userRepository) => {
    const List = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield userRepository.List();
        }
        catch (error) {
            throw new Error(`Error getting all users: ${error.message}`);
        }
    });
    const FindByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield userRepository.FindByEmail(email);
        }
        catch (error) {
            throw new Error(`Error getting all users: ${error.message}`);
        }
    });
    return { List, FindByEmail };
};
exports.default = newUserService;
//# sourceMappingURL=user.service.js.map