import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAnalysteComponent } from './create-analyste.component';

describe('CreateAnalysteComponent', () => {
  let component: CreateAnalysteComponent;
  let fixture: ComponentFixture<CreateAnalysteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateAnalysteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateAnalysteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
