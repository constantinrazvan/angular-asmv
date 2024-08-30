import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CookieModalComponent } from './web/cookie-modal/cookie-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CookieModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-asmv';
}
