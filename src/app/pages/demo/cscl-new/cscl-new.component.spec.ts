import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsclNewComponent } from './cscl-new.component';

describe('CsclNewComponent', () => {
  let component: CsclNewComponent;
  let fixture: ComponentFixture<CsclNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CsclNewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsclNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
