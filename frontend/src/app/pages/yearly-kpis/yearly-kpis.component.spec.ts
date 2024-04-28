import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearlyKpisComponent } from './yearly-kpis.component';

describe('YearlyKpisComponent', () => {
  let component: YearlyKpisComponent;
  let fixture: ComponentFixture<YearlyKpisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [YearlyKpisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YearlyKpisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
