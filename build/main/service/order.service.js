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
const class_validator_1 = require("class-validator");
const order_dto_1 = require("src/pkg/dto/order.dto");
const uuid_1 = require("uuid");
const newOrderService = (orderRepository, bookRepository, userRepository) => {
    const List = (userId, page, pageSize) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const offset = (page - 1) * pageSize;
            const limit = pageSize;
            const orders = yield orderRepository.List(userId, limit, offset);
            const counts = yield orderRepository.Count();
            const totalPages = Math.ceil(counts / pageSize);
            return {
                data: orders,
                message: "Orders loaded successfully",
                code: 200,
                pagination: {
                    page,
                    pageSize,
                    totalPages,
                },
            };
        }
        catch (error) {
            throw new Error(`Error getting all orders: ${error.message}`);
        }
    });
    const Create = (orderDtoParam) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const orderDto = new order_dto_1.OrderDto();
            orderDto.book_id = orderDtoParam.book_id;
            const errors = yield (0, class_validator_1.validate)(orderDto);
            if (errors.length > 0) {
                return {
                    data: null,
                    message: errors === null || errors === void 0 ? void 0 : errors.toString(),
                    code: 400,
                };
            }
            const bookData = yield bookRepository.FindById(orderDto.book_id);
            const userData = yield userRepository.FindById(orderDtoParam === null || orderDtoParam === void 0 ? void 0 : orderDtoParam.user_id);
            yield userRepository.UpdatePoint({
                id: orderDtoParam === null || orderDtoParam === void 0 ? void 0 : orderDtoParam.user_id,
                points: Number(userData === null || userData === void 0 ? void 0 : userData.points) - Number(bookData === null || bookData === void 0 ? void 0 : bookData.point),
            });
            const orderData = yield orderRepository.Create({
                id: (0, uuid_1.v4)(),
                book_id: orderDto.book_id,
                user_id: orderDtoParam === null || orderDtoParam === void 0 ? void 0 : orderDtoParam.user_id,
            });
            return {
                data: orderData,
                message: "Order created successfully",
                code: 201,
            };
        }
        catch (error) {
            throw new Error(`Error creating order: ${error.message}`);
        }
    });
    const Delete = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const orderData = yield orderRepository.FindById(orderId);
            const bookData = yield bookRepository.FindById(orderData === null || orderData === void 0 ? void 0 : orderData.book_id);
            const userData = yield userRepository.FindById(orderData === null || orderData === void 0 ? void 0 : orderData.user_id);
            yield userRepository.UpdatePoint({
                id: userData === null || userData === void 0 ? void 0 : userData.id,
                points: Number(userData === null || userData === void 0 ? void 0 : userData.points) + Number(bookData === null || bookData === void 0 ? void 0 : bookData.point),
            });
            yield orderRepository.Delete(orderId);
            return {
                data: null,
                message: "Order deleted successfully",
                code: 200,
            };
        }
        catch (error) {
            throw new Error(`Error creating order: ${error.message}`);
        }
    });
    return { List, Create, Delete };
};
exports.default = newOrderService;
//# sourceMappingURL=order.service.js.map