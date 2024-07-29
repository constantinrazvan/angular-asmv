export interface ProjectImage {
    $id: string;
    id: number;
    filePath: string;
    projectId: number;
    project?: {
      $ref: string;
    };
  }