import { IsArray, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class BookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  writer: string;

  @IsNotEmpty()
  @IsString()
  point: string;

  @IsArray()
  @IsNotEmpty({ each: true })
  tags: string[];
}

export interface BookDtoType {
  title: string;
  writer: string;
  point: string;
  tags: string[];
}
