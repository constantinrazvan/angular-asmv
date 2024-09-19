import { Component, OnInit } from '@angular/core';
import { WebNavbarComponent } from '../../shared/web-navbar/web-navbar.component';
import { WebFooterComponent } from '../../shared/web-footer/web-footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from '../../core/models/Message';
import { MessagesService } from '../../core/services/messages/messages.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, WebNavbarComponent, WebFooterComponent, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(
    private service: MessagesService,
    private router: Router
  ){}

  message : Message = {
    fullname: "",
    email: "",
    text: "", 
    newRequest: true
  }

  title = "ASMV - Contact";

  error: string = "";

  ngOnInit(): void {
    this.message.fullname = "";
    this.message.email = "";
    this.message.text = "";
    this.message.newRequest = true;
  }

  postMessage() { 
    if(this.message.fullname == "" || this.message.email == "" || this.message.text == "") {
      this.error = "Completati toate campurile!";
      return;
    }

    this.error = "";
    
    this.service.addMessage(this.message).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.log(error);
        this.error = "Eroare la trimiterea mesajului!";
      }
    })
  }

}