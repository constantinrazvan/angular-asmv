import { ProjectImage } from "./ProjectImage";

export interface Project {
  id: number;
  title: string;
  summary: string;
  content: string;
  userId: number;
  images?: {
    $id: string;
    $values: ProjectImage[];
  };
}