import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessagesService } from '../../../core/services/messages/messages.service';
import { Message } from '../../../core/models/Message';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-message',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, FormsModule, CommonModule, RouterLink],
  templateUrl: './view-message.component.html',
  styleUrl: './view-message.component.css'
})
export class ViewMessageComponent {

  constructor(
    private service: MessagesService,
    private route: ActivatedRoute
  ) {}

  param = Number(this.route.snapshot.paramMap.get('id'));
  message: Message = {} as Message;

  getOne(id: number) {
    return this.service.getOneMessage(id).subscribe({
      next: (data) => {
        this.message = data;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}