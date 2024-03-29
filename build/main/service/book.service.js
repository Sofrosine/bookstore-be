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
const book_dto_1 = require("src/pkg/dto/book.dto");
const uuid_1 = require("uuid");
const class_validator_1 = require("class-validator");
const newBookService = (bookRepository) => {
    const List = (page, pageSize, searchText) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const offset = (page - 1) * pageSize;
            const limit = pageSize;
            const books = yield bookRepository.List(limit, offset, searchText);
            const counts = yield bookRepository.Count();
            const totalPages = Math.ceil(counts / pageSize);
            return {
                data: books,
                message: "Books loaded successfully",
                code: 200,
                pagination: {
                    page,
                    pageSize,
                    totalPages,
                },
            };
        }
        catch (error) {
            throw new Error(`Error getting all books: ${error.message}`);
        }
    });
    const Create = (bookDtoParam) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const bookDto = new book_dto_1.BookDto();
            bookDto.title = bookDtoParam.title;
            bookDto.writer = bookDtoParam.writer;
            bookDto.point = bookDtoParam.point;
            bookDto.tags = bookDtoParam.tags;
            const errors = yield (0, class_validator_1.validate)(bookDto);
            if (errors.length > 0) {
                return {
                    data: null,
                    message: errors === null || errors === void 0 ? void 0 : errors.toString(),
                    code: 400,
                };
            }
            const bookData = yield bookRepository.Create({
                id: (0, uuid_1.v4)(),
                point: bookDtoParam.point,
                title: bookDtoParam.title,
                tags: `{${bookDtoParam.tags.join(",")}}`,
                writer: bookDtoParam.writer,
            });
            return {
                data: bookData,
                message: "Book created successfully",
                code: 201,
            };
        }
        catch (error) {
            throw new Error(`Error getting all books: ${error.message}`);
        }
    });
    return { List, Create };
};
exports.default = newBookService;
//# sourceMappingURL=book.service.js.map