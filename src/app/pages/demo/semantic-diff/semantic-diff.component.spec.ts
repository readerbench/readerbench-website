import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemanticDiffComponent } from './semantic-diff.component';

describe('SemanticDiffComponent', () => {
  let component: SemanticDiffComponent;
  let fixture: ComponentFixture<SemanticDiffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemanticDiffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemanticDiffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
