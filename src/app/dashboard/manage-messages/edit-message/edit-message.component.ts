import { Component, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessagesService } from '../../../core/services/messages/messages.service';
import { Message } from '../../../core/models/Message';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-edit-message',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatFormFieldModule, FormsModule, RouterLink],
  templateUrl: './edit-message.component.html',
  styleUrl: './edit-message.component.css'
})
export class EditMessageComponent implements OnInit {

  ngOnInit(): void {
    this.getMessage(this.param);
  }

  constructor(
    private service: MessagesService,
    private route: ActivatedRoute
  ){}

  param = Number(this.route.snapshot.paramMap.get('id'));
  message : Message = {} as Message;

  getMessage(id: number) {
    this.service.getOneMessage(id).subscribe({
      next: (data) => {
        this.message = data;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  editMessage(id: number, message: Message) {
    this.service.updateMessage(id, this.message).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
