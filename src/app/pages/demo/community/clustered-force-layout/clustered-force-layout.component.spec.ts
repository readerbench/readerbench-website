import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusteredForceLayoutComponent } from './clustered-force-layout.component';

describe('ClusteredForceLayoutComponent', () => {
  let component: ClusteredForceLayoutComponent;
  let fixture: ComponentFixture<ClusteredForceLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClusteredForceLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusteredForceLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
