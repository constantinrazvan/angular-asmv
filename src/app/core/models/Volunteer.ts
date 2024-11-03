export interface Volunteer {
  id?: number; 
  firstname: string; 
  lastname: string; 
  email: string; 
  phone: string; 
  city: string; 
  status: string;
  ocupation: string; 
  joinedDate: string;
  president?: boolean;
  vicepresident?: boolean;
  volunteerImage?: { url: string } | File | string | null; 
  department: string;
}
