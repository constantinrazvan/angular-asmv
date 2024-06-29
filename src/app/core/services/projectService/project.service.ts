import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projects = [
    {
        id: 1,
        name: 'River Cleanup Initiative',
        summary: 'Help clean the riverside and promote environmental sustainability.',
        description: 'Join us to clean the riverside and promote water conservation in our community. This project aims to reduce pollution and raise awareness about environmental issues. Through weekly clean-up events and public education campaigns, we can make a significant impact on the local ecosystem. Volunteers gain hands-on experience in conservation efforts and contribute directly to the improvement of their local environment.'
    },
    {
        id: 2,
        name: 'Tech for Good',
        summary: 'Empowering nonprofits with technology.',
        description: 'Tech for Good is dedicated to providing technological solutions to nonprofits to increase their efficiency and reach. We build custom apps and websites that streamline operations and enhance engagement with donors and volunteers. By integrating advanced tech tools, we enable nonprofits to focus more on their core missions and less on logistical complexities.'
    },
    {
        id: 3,
        name: 'Community Health Drive',
        summary: 'Enhancing health through community engagement.',
        description: 'Focused on improving community health through free screenings, health education seminars, and wellness activities. Our Community Health Drive is aimed at bringing better health to our community by organizing monthly health drives that provide free medical check-ups, informative health talks by experienced practitioners, and activities that promote a healthy lifestyle. This initiative helps bridge the health information gap and provides direct benefits to underserved populations.'
    }
];


  constructor() { }

  getProjectById(id: number): Observable<any> {
    return of(this.projects.find(project => project.id === id));
  }

  getProjects() {
    return of(this.projects);
  }
}
