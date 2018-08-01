import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoSemDiffCommonFieldsComponent } from './sem-diff-common-fields.component';

describe('DemoSemDiffCommonFieldsComponent', () => {
  let component: DemoSemDiffCommonFieldsComponent;
  let fixture: ComponentFixture<DemoSemDiffCommonFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoSemDiffCommonFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoSemDiffCommonFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
