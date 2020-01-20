import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumRecommendationComponent } from './curriculum-recommendation.component';

describe('CurriculumRecomandationComponent', () => {
  let component: CurriculumRecommendationComponent;
  let fixture: ComponentFixture<CurriculumRecommendationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CurriculumRecommendationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurriculumRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
