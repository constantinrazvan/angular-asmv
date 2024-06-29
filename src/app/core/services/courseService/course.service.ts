import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs'; // Import 'of' from RxJS to create an observable

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  courses = [
    {
        id: 1,
        title: 'Fundamentals of Public Speaking',
        instructor: 'Dr. Lisa Haydon',
        summary: 'Master the art of public speaking through essential techniques and personal feedback.',
        description: 'Learn the key techniques of public speaking and effective communication from industry expert Dr. Lisa Haydon. This course covers everything from crafting a compelling narrative to engaging your audience with effective speech dynamics. With interactive sessions and personalized feedback, you’ll develop confidence and skills to speak publicly in any setting or profession.'
    },
    {
        id: 2,
        title: 'Introduction to Coding',
        instructor: 'James Peterson',
        summary: 'Kickstart your coding journey with foundational skills in Python and web development.',
        description: 'Start your journey into the tech world with our beginner-friendly coding course led by James Peterson, focusing on Python and web basics. This course will guide you through the fundamentals of programming, including syntax, data structures, and basic algorithms. Learn to build simple web applications and gain the skills needed for entry-level programming roles or further specialized study.'
    },
    {
        id: 3,
        title: 'Advanced Project Management',
        instructor: 'Anita Raman',
        summary: 'Elevate your project management capabilities to lead complex projects successfully.',
        description: 'Enhance your project management skills with advanced strategies and tools for managing large-scale projects, taught by seasoned project manager Anita Raman. This course dives deep into project planning, risk management, stakeholder communication, and resource allocation, empowering you to deliver projects on time, on budget, and with high-quality outcomes. Suitable for experienced professionals seeking to advance their leadership skills.'
    }
];


  constructor() { }

  getCourseById(id: number): Observable<any> {
    return of(this.courses.find(course => course.id === id));
  }

  getCourses() {
    return of(this.courses);
  }
}
