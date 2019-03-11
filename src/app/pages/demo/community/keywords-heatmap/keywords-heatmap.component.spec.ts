import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityKeywordsHeatmapComponent } from './keywords-heatmap.component';

describe('KeywordsHeatmapComponent', () => {
  let component: CommunityKeywordsHeatmapComponent;
  let fixture: ComponentFixture<CommunityKeywordsHeatmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CommunityKeywordsHeatmapComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityKeywordsHeatmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
