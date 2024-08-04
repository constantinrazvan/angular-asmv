import { Project } from "./Project";

export interface ProjectApiResponse {
  $id: string;          // Unique identifier for the response, if needed
  $values: Project[];   // Array of Project objects
}
