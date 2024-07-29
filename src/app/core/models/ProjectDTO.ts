import { ProjectImage } from "./ProjectImage";

export interface ProjectDTO {
  title: string;
  content: string;
  images: ProjectImage[]; // Ensure this matches your data model
}
