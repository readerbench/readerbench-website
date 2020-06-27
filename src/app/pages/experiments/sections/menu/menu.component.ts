import { Component, OnInit } from '@angular/core';
import { ExperimentsMenuItemInterface } from './menu-item.interface';
import { ExperimentsMenuItemsData } from './menu-items.data';

@Component({
  selector: 'app-experiments-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class ExperimentsMenuComponent implements OnInit {

  items: ExperimentsMenuItemInterface[] = [];
  path: string;

  constructor() {
    this.path = 'experiments/sentiment-analysis';
  }

  ngOnInit() {
    this.items = ExperimentsMenuItemsData;
  }

  getClass(path) {
    return (this.path === path) ? 'current' : '';
  }

}
