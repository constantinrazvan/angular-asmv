import { ProjectImage } from "./ProjectImage";

export interface ProjectDTO {
  title: string;
  summary: string;
  content: string;
  images: ProjectImage[]; // Ensure this matches your data model
}
