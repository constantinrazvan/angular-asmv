export interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: string;
    created_at: Date | null; // Use Date type here
  }
  