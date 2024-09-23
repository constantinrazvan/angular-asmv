export interface Project {
  id: number, 
  title: string, 
  content:  string, 
  summary: string, 
  imageUrl?: string | File | null
}