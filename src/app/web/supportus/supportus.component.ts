import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { WebNavbarComponent } from '../../shared/web-navbar/web-navbar.component';
import { WebFooterComponent } from '../../shared/web-footer/web-footer.component';

@Component({
  selector: 'app-supportus',
  standalone: true,
  imports: [CommonModule, WebNavbarComponent, WebFooterComponent],
  templateUrl: './supportus.component.html',
  styleUrl: './supportus.component.css'
})
export class SupportusComponent {
  title = "ASMV - Support";
  revolutLogo: string = "";
}
