export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  points?: number;
  created_at?: string;
}
