import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyKPIsComponent } from './monthly-kpis.component';

describe('MonthlyKPIsComponent', () => {
  let component: MonthlyKPIsComponent;
  let fixture: ComponentFixture<MonthlyKPIsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonthlyKPIsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonthlyKPIsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
