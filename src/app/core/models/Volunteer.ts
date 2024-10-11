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
  imageUrl?: string | File | null; // Keep this for upload
}
