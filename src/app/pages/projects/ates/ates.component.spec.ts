import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtesComponent } from './ates.component';

describe('AtesComponent', () => {
  let component: AtesComponent;
  let fixture: ComponentFixture<AtesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
