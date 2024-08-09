export interface Project {
  id: number;
  title: string;
  content: string;
  summary: string;
  userId: number;
  image: string; // Store the image path as a string
  date: Date;
}