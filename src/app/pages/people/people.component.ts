import { Component, OnInit } from '@angular/core';
import { PeopleCore, PeopleStudents, PeopleLSE, PeopleLMU, PeopleASU, PeopleGSU, PeoplePrevious } from './people.data';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  peopleListCore: any;
  peopleListStudents: any;
  peopleListLSE: any;
  peopleListLMU: any;
  peopleListASU: any;
  peopleListGSU: any;
  peopleListPrevious: any;

  constructor() { }

  ngOnInit() {

    this.peopleListCore = PeopleCore;
    this.peopleListStudents = PeopleStudents;
    this.peopleListLSE = PeopleLSE;
    this.peopleListLMU = PeopleLMU;
    this.peopleListASU = PeopleASU;
    this.peopleListGSU = PeopleGSU;
    this.peopleListPrevious = PeoplePrevious;
  }

}
