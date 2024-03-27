import { Response } from "express";

export interface ResponseServiceType<T> {
  data: T | null;
  message: string | null;
  code: number | null;
  pagination?: {
    page: number;
    pageSize: number;
    totalPages: number;
  };
  token?: string;
}

export const CustomResponse = <T>(
  res: Response,
  response: ResponseServiceType<T>
) => {
  res.status(response?.code).json({
    data: response?.data,
    message: response?.message,
  });
};

export const CustomResponseWithToken = <T>(
  res: Response,
  response: ResponseServiceType<T>
) => {
  res.status(response?.code).json({
    data: response?.data,
    message: response?.message,
    token: response?.token,
  });
};

export const CustomResponseWithPagination = <T>(
  res: Response,
  response: ResponseServiceType<T>
) => {
  res.status(response?.code).json({
    data: response?.data,
    message: response?.message,
    pagination: response?.pagination,
  });
};
