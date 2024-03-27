import { ResponseServiceType } from "src/pkg/helpers/response";
import { Book } from "../entity/book";
import { BookRepositoryType } from "../repository/types";
import { BookServiceType } from "./types";
import { BookDto, BookDtoType } from "src/pkg/dto/book.dto";
import { v4 } from "uuid";
import { validate } from "class-validator";

const newBookService = (
  bookRepository: BookRepositoryType
): BookServiceType => {
  const List = async (
    page: number,
    pageSize: number
  ): Promise<ResponseServiceType<Book[]>> => {
    try {
      const offset = (page - 1) * pageSize;
      const limit = pageSize;
      const books = await bookRepository.List(limit, offset);
      const counts = await bookRepository.Count();
      const totalPages = Math.ceil(counts / pageSize);

      return {
        data: books,
        message: "Books loaded successfully",
        code: 201,
        pagination: {
          page,
          pageSize,
          totalPages,
        },
      };
    } catch (error) {
      throw new Error(`Error getting all books: ${error.message}`);
    }
  };

  const Create = async (
    bookDtoParam: BookDtoType
  ): Promise<ResponseServiceType<Book>> => {
    try {
      const bookDto = new BookDto();
      bookDto.title = bookDtoParam.title;
      bookDto.writer = bookDtoParam.writer;
      bookDto.point = bookDtoParam.point;
      bookDto.tags = bookDtoParam.tags;

      const errors = await validate(bookDto);
      if (errors.length > 0) {
        return {
          data: null,
          message: errors?.toString(),
          code: 400,
        };
      }

      const bookData = await bookRepository.Create({
        id: v4(),
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
    } catch (error) {
      throw new Error(`Error getting all books: ${error.message}`);
    }
  };

  return { List, Create };
};

export default newBookService;
