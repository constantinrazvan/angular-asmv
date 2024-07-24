import { TestBed } from '@angular/core/testing';

import { BecomevolunteerService } from './becomevolunteer.service';

describe('BecomevolunteerService', () => {
  let service: BecomevolunteerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BecomevolunteerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
