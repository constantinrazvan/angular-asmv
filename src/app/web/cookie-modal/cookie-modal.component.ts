import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CookieModalDialogComponent } from '../cookie-modal-dialog/cookie-modal-dialog.component';

@Component({
  selector: 'app-cookie-modal',
  template: '',  // Nu avem nevoie de un șablon pentru acest componentă
  standalone: true,
  imports: [],
})
export class CookieModalComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.openDialog();
  }

  openDialog(): void {
    if (!localStorage.getItem('cookiesAccepted'))
      this.dialog.open(CookieModalDialogComponent, {
        width: '500px',    // Ajustează lățimea la 400px sau o altă valoare
        maxWidth: '90vw',  // Lățimea maximă să fie 90% din lățimea viewport-ului
        panelClass: 'custom-dialog' // Opțional: pentru alte stilizări
      });
  }

  acceptGDPR() {
    localStorage.setItem('gdprAccepted', 'true');
  }
}
