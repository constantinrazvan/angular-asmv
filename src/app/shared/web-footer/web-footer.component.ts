import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-web-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './web-footer.component.html',
  styleUrl: './web-footer.component.css',
})
export class WebFooterComponent {
  constructor() {}

  public email: string = "asmv.ct@gmail.com";

  getCurrentYear(): number {
    return new Date().getFullYear();
  }
}
