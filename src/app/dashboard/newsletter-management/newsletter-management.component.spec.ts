import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterManagementComponent } from './newsletter-management.component';

describe('NewsletterManagementComponent', () => {
  let component: NewsletterManagementComponent;
  let fixture: ComponentFixture<NewsletterManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsletterManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewsletterManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
