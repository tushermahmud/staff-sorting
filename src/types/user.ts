export interface User {
  id: number;
  email: string;
  potatoes: number;
  tags: string[];
  fullName: string;
  location: string;
  year: number;
  selected?: boolean;
}