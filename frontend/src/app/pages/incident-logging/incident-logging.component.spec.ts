import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentLoggingComponent } from './incident-logging.component';

describe('IncidentLoggingComponent', () => {
  let component: IncidentLoggingComponent;
  let fixture: ComponentFixture<IncidentLoggingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IncidentLoggingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IncidentLoggingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
