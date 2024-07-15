import { TestBed } from '@angular/core/testing';

import { ProfileUserServiceService } from './profile-user-service.service';

describe('ProfileUserServiceService', () => {
  let service: ProfileUserServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileUserServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
