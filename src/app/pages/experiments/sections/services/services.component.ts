import { Component, OnInit } from '@angular/core';
import { ExperimentsMenuItemInterface } from '../menu/menu-item.interface';
import { ExperimentsMenuItemsData } from '../menu/menu-items.data';

@Component({
  selector: 'app-experiments-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ExperimentsServicesComponent implements OnInit {

  items: ExperimentsMenuItemInterface[] = [];

  constructor() { }

  ngOnInit() {
    this.items = ExperimentsMenuItemsData;
  }

}
