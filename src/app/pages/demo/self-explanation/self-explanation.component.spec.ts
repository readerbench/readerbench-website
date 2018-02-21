import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfExplanationComponent } from './self-explanation.component';

describe('SelfExplanationComponent', () => {
  let component: SelfExplanationComponent;
  let fixture: ComponentFixture<SelfExplanationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfExplanationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfExplanationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
