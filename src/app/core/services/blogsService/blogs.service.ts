import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  constructor(private http: HttpClient) { }

  getBlogs(): Observable<any> {
    return this.http.get(`${environment.api_base_url}${environment.blog_getAll}`);
  }

  getBlogById(id: number): Observable<any> {
    return this.http.get(`${environment.api_base_url}${environment.blog_getById}${id}`);
  }

  addBlog(blog: any): Observable<any> {
    return this.http.post(`${environment.api_base_url}${environment.blog_newBlog}`, blog);
  }

  updateBlog(id: number, blog: any): Observable<any> {
    return this.http.put(`${environment.api_base_url}${environment.blog_updateBlog}/${id}`, blog);
  }

  deleteBlog(id: number): Observable<any> {
    return this.http.delete(`${environment.api_base_url}${environment.blog_deleteBlog}/${id}`);
  }

  uploadHeaderImage(imageData: FormData): Observable<any> {
    return this.http.post(`${environment.api_base_url}blogs/uploadHeaderImage`, imageData);
  }

  uploadGalleryImage(imageData: FormData): Observable<any> {
    return this.http.post(`${environment.api_base_url}blogs/uploadGalleryImage`, imageData);
  }
}
