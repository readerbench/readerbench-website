import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CIModelComponent } from './CIModel.component';

describe('CIModelComponent', () => {
  let component: CIModelComponent;
  let fixture: ComponentFixture<CIModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CIModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CIModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
