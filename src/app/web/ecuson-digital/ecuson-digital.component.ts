import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { WebNavbarComponent } from '../../shared/web-navbar/web-navbar.component';
import { WebFooterComponent } from '../../shared/web-footer/web-footer.component';

@Component({
  selector: 'app-ecuson-digital',
  standalone: true,
  imports: [CommonModule, WebNavbarComponent, WebFooterComponent],
  templateUrl: './ecuson-digital.component.html',
  styleUrl: './ecuson-digital.component.css'
})
export class EcusonDigitalComponent {

}
