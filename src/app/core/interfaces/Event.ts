import { Volunteer } from './Volunteer';

export interface Event {
  id: number;
  title: string;
  content: string;
  date: Date;
  participants: Volunteer[];
  created_at: string;
  subcategory: string; 
}
