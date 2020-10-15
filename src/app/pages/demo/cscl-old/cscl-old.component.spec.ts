import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsclOldComponent } from './cscl-old.component';

describe('CsclOldComponent', () => {
  let component: CsclOldComponent;
  let fixture: ComponentFixture<CsclOldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CsclOldComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsclOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
