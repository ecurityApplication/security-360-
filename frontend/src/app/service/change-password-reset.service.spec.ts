import { TestBed } from '@angular/core/testing';

import { ChangePasswordResetService } from './change-password-reset.service';

describe('ChangePasswordResetService', () => {
  let service: ChangePasswordResetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangePasswordResetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
