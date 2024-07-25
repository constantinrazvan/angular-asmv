import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from '../../models/Blog';
import { BlogDTO } from '../../models/BlogDTO';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private baseUrl = 'https://localhost:7155/api/Blog';

  constructor(private http: HttpClient) { }

  getBlogs(): Observable<{ $values: Blog[] }> { // Adjust the return type based on your API response
    return this.http.get<{ $values: Blog[] }>(this.baseUrl);
  }

  addBlog(blog: BlogDTO, userId: number): Observable<Blog> {
    return this.http.post<Blog>(`${this.baseUrl}?userId=${userId}`, blog);
  }

  deleteBlog(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
