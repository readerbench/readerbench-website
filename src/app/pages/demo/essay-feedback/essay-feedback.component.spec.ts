import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EssayFeedbackComponent } from './essay-feedback.component';

describe('EssayFeedbackComponent', () => {
  let component: EssayFeedbackComponent;
  let fixture: ComponentFixture<EssayFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EssayFeedbackComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EssayFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
