import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcusonDigitalComponent } from './ecuson-digital.component';

describe('EcusonDigitalComponent', () => {
  let component: EcusonDigitalComponent;
  let fixture: ComponentFixture<EcusonDigitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcusonDigitalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EcusonDigitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
