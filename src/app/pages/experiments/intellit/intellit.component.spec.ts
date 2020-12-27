import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntellitComponent } from './intellit.component';

describe('IntellitComponent', () => {
  let component: IntellitComponent;
  let fixture: ComponentFixture<IntellitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IntellitComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntellitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
