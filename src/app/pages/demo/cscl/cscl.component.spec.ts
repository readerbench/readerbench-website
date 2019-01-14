import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsclComponent } from './cscl.component';

describe('CsclComponent', () => {
  let component: CsclComponent;
  let fixture: ComponentFixture<CsclComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CsclComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsclComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
