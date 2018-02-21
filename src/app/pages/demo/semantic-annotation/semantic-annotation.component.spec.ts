import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemanticAnnotationComponent } from './semantic-annotation.component';

describe('SemanticAnnotationComponent', () => {
  let component: SemanticAnnotationComponent;
  let fixture: ComponentFixture<SemanticAnnotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemanticAnnotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemanticAnnotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
