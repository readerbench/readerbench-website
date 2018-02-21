import { Component, OnInit } from '@angular/core';
import { DemoMenuItemInterface } from '../menu/menu-item.interface';
import { DemoMenuItemsData } from '../menu/menu-items.data';

@Component({
  selector: 'app-demo-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class DemoServicesComponent implements OnInit {

  items: DemoMenuItemInterface[] = [];

  constructor() { }

  ngOnInit() {
    this.items = DemoMenuItemsData;
  }

}
