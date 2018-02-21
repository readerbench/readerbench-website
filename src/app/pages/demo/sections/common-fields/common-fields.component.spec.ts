import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoCommonFieldsComponent } from './common-fields.component';

describe('DemoCommonFieldsComponent', () => {
  let component: DemoCommonFieldsComponent;
  let fixture: ComponentFixture<DemoCommonFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoCommonFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoCommonFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
