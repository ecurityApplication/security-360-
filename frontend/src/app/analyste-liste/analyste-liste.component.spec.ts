import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysteListeComponent } from './analyste-liste.component';

describe('AnalysteListeComponent', () => {
  let component: AnalysteListeComponent;
  let fixture: ComponentFixture<AnalysteListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnalysteListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnalysteListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
