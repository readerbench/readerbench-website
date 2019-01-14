import { Component, OnInit } from '@angular/core';
import { DemoMenuItemInterface } from './menu-item.interface';
import { DemoMenuItemsData } from './menu-items.data';

@Component({
  selector: 'app-demo-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class DemoMenuComponent implements OnInit {

  items: DemoMenuItemInterface[] = [];
  path: string;

  constructor() {
    this.path = 'demo/sentiment-analysis';
  }

  ngOnInit() {
    this.items = DemoMenuItemsData;
  }

  getClass(path) {
    return (this.path === path) ? 'current' : '';
  }

}
