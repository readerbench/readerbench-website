import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantEvolutionComponent } from './participant-evolution.component';

describe('ParticipantEvolutionComponent', () => {
  let component: ParticipantEvolutionComponent;
  let fixture: ComponentFixture<ParticipantEvolutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantEvolutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantEvolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
