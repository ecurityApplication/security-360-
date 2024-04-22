import { TestBed } from '@angular/core/testing';

import { PasswordResetTokenServiceService } from './password-reset-token-service.service';

describe('PasswordResetTokenServiceService', () => {
  let service: PasswordResetTokenServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordResetTokenServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
