import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEscalationComponent } from './update-escalation.component';

describe('UpdateEscalationComponent', () => {
  let component: UpdateEscalationComponent;
  let fixture: ComponentFixture<UpdateEscalationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateEscalationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateEscalationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
