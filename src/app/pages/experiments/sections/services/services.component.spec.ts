import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentsServicesComponent } from './services.component';

describe('ExperimentsServicesComponent', () => {
  let component: ExperimentsServicesComponent;
  let fixture: ComponentFixture<ExperimentsServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExperimentsServicesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperimentsServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
