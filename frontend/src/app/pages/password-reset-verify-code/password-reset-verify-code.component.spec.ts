import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordResetVerifyCodeComponent } from './password-reset-verify-code.component';

describe('PasswordResetVerifyCodeComponent', () => {
  let component: PasswordResetVerifyCodeComponent;
  let fixture: ComponentFixture<PasswordResetVerifyCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasswordResetVerifyCodeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PasswordResetVerifyCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
