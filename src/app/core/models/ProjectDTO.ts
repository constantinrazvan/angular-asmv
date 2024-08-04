export interface ProjectDTO {
  title: string;
  summary: string;
  content: string;
  image: File | string; // Allow either a File object or a string
}
