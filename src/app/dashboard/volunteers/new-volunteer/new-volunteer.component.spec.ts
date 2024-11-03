import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVolunteerComponent } from './new-volunteer.component';

describe('NewVolunteerComponent', () => {
  let component: NewVolunteerComponent;
  let fixture: ComponentFixture<NewVolunteerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewVolunteerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewVolunteerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
