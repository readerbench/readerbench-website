import { Component, OnInit } from '@angular/core';
import { Projects } from './projects.data';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projectsList: any;

  constructor() { }

  ngOnInit() {
    this.projectsList = Projects;
  }

}
