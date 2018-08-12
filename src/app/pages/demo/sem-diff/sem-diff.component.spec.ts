import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemDiffComponent } from './sem-diff.component';

describe('SemDiffComponent', () => {
  let component: SemDiffComponent;
  let fixture: ComponentFixture<SemDiffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemDiffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemDiffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });
  

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
