import { Component, OnInit } from '@angular/core';
import { WebNavbarComponent } from '../../shared/web-navbar/web-navbar.component';
import { WebFooterComponent } from '../../shared/web-footer/web-footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from '../../core/models/Message';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, WebNavbarComponent, WebFooterComponent, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  message : Message = {
    name: "",
    email: "",
    text: ""
  }

  title = "ASMV - Contact";

  error: string = "";
  
  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.error = "Momentan serviciul de contact nu este configurat! Te rugam sa ne contactezi prin intermediul unei platforme social media sau pe mail!";
  }

  postMessage() { 
    console.log(this.message);
  }

}