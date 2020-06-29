import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentsMenuComponent } from './menu.component';

describe('ExperimentsMenuComponent', () => {
  let component: ExperimentsMenuComponent;
  let fixture: ComponentFixture<ExperimentsMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExperimentsMenuComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperimentsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
