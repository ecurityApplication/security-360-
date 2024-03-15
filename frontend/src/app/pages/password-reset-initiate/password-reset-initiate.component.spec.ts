import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordResetInitiateComponent } from './password-reset-initiate.component';

describe('PasswordResetInitiateComponent', () => {
  let component: PasswordResetInitiateComponent;
  let fixture: ComponentFixture<PasswordResetInitiateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasswordResetInitiateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PasswordResetInitiateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
