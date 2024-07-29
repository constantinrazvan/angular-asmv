import { Project } from "./Project";

export interface ProjectApiResponse {
  $id: string;
  $values: Project[];
}