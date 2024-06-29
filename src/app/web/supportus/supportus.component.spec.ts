import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportusComponent } from './supportus.component';

describe('SupportusComponent', () => {
  let component: SupportusComponent;
  let fixture: ComponentFixture<SupportusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SupportusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
