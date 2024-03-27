export interface Book {
  id: string;
  title: string;
  writer: string;
  cover_image?: string;
  point: string;
  tags: string[] | string;
  created_at?: string;
}
