import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LakComponent } from './lak.component';

describe('LakComponent', () => {
  let component: LakComponent;
  let fixture: ComponentFixture<LakComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LakComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
