import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordsHeatmapComponent } from './keywords-heatmap.component';

describe('KeywordsHeatmapComponent', () => {
  let component: KeywordsHeatmapComponent;
  let fixture: ComponentFixture<KeywordsHeatmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KeywordsHeatmapComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeywordsHeatmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
