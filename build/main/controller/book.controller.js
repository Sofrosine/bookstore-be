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
const newBookController = (service) => {
    const List = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const page = req.query.page ? parseInt(req.query.page) : 1;
            const pageSize = req.query.pageSize
                ? parseInt(req.query.pageSize)
                : 10;
            const searchText = req.query.search ? req.query.search : "";
            const response = yield service.List(page, pageSize, String(searchText));
            (0, response_1.CustomResponseWithPagination)(res, response);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
    const Create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const bookDto = req.body;
            const response = yield service.Create(bookDto);
            (0, response_1.CustomResponse)(res, response);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
    return { List, Create };
};
exports.default = newBookController;
//# sourceMappingURL=book.controller.js.map