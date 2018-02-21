import { Component, OnInit } from '@angular/core';
import { AboutItemsData } from './about-items.data';
import { AboutItemInterface } from './about-item.interface';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  items: AboutItemInterface[] = [];

  constructor() { }

  ngOnInit() {
    this.items = AboutItemsData;
  }

}
