import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiLevelEdgeBundlingComponent } from './multi-level-edge-bundling.component';

describe('MultiLevelEdgeBundlingComponent', () => {
  let component: MultiLevelEdgeBundlingComponent;
  let fixture: ComponentFixture<MultiLevelEdgeBundlingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiLevelEdgeBundlingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiLevelEdgeBundlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
