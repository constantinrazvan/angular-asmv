import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteersManagementComponent } from './volunteers-management.component';

describe('VolunteersManagementComponent', () => {
  let component: VolunteersManagementComponent;
  let fixture: ComponentFixture<VolunteersManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VolunteersManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VolunteersManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
