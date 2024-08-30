import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookieModalDialogComponent } from './cookie-modal-dialog.component';

describe('CookieModalDialogComponent', () => {
  let component: CookieModalDialogComponent;
  let fixture: ComponentFixture<CookieModalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CookieModalDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CookieModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
