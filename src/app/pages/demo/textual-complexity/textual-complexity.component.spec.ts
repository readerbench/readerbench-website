import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextualComplexityComponent } from './textual-complexity.component';

describe('TextualComplexityComponent', () => {
  let component: TextualComplexityComponent;
  let fixture: ComponentFixture<TextualComplexityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TextualComplexityComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextualComplexityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
