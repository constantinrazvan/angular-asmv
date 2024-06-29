import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  blogs = [
    {
        id: 1,
        title: "How to Start a Successful Blog",
        summary: "Lorem ipsum dolore",
        body: "Starting a blog can be a fantastic way to express yourself, share your knowledge, and even make some money. Learn how to start a blog in a few simple steps and how to grow your audience."
    },
    {
        id: 2,
        title: "The Best Tools for Bloggers",
        summary: "Lorem ipsum dolore",
        body: "Explore the top tools every blogger should know about, from platforms and plugins to analytics and content creation tools. Elevate your blogging game with the right tools by your side."
    },
    {
        id: 3,
        title: "Creating Engaging Content",
        summary: "Lorem ipsum dolore",
        body: "Engaging content is key to keeping your audience coming back for more. Discover tips and strategies for creating content that resonates with your readers and keeps them engaged."
    },
    {
        id: 4,
        title: "SEO Strategies for Blogs",
        summary: "Lorem ipsum dolore",
        body: "SEO is critical for getting your blog noticed. Learn about the latest SEO strategies that can help boost your blog's visibility on search engines and attract more organic traffic."
    },
    {
        id: 5,
        title: "Monetizing Your Blog",
        summary: "Lorem ipsum dolore",
        body: "Monetizing your blog can be a great way to earn a passive income. Find out about the different ways you can make money from your blog, from advertising to affiliate marketing and beyond."
    }
  ];

  constructor() { }

  getBlogs(): Observable<any> {
    return of(this.blogs);
  }

  getBlogById(id: number): Observable<any> {
    const blog = this.blogs.find(blog => blog.id === id);
    return of(blog);
  }
}
