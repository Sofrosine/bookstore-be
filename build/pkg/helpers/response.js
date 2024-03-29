"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomResponseWithPagination = exports.CustomResponseWithToken = exports.CustomResponse = void 0;
const CustomResponse = (res, response) => {
    res.status(response === null || response === void 0 ? void 0 : response.code).json({
        data: response === null || response === void 0 ? void 0 : response.data,
        message: response === null || response === void 0 ? void 0 : response.message,
    });
};
exports.CustomResponse = CustomResponse;
const CustomResponseWithToken = (res, response) => {
    res.status(response === null || response === void 0 ? void 0 : response.code).json({
        data: response === null || response === void 0 ? void 0 : response.data,
        message: response === null || response === void 0 ? void 0 : response.message,
        token: response === null || response === void 0 ? void 0 : response.token,
    });
};
exports.CustomResponseWithToken = CustomResponseWithToken;
const CustomResponseWithPagination = (res, response) => {
    res.status(response === null || response === void 0 ? void 0 : response.code).json({
        data: response === null || response === void 0 ? void 0 : response.data,
        message: response === null || response === void 0 ? void 0 : response.message,
        pagination: response === null || response === void 0 ? void 0 : response.pagination,
    });
};
exports.CustomResponseWithPagination = CustomResponseWithPagination;
//# sourceMappingURL=response.js.map