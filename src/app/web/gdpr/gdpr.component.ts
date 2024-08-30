import { Component } from '@angular/core';
import { WebFooterComponent } from '../../shared/web-footer/web-footer.component';
import { WebNavbarComponent } from '../../shared/web-navbar/web-navbar.component';

@Component({
  selector: 'app-gdpr',
  standalone: true,
  imports: [WebFooterComponent, WebNavbarComponent],
  templateUrl: './gdpr.component.html',
  styleUrl: './gdpr.component.css'
})
export class GdprComponent {

}
