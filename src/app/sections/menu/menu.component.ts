import { Component, OnInit, Input } from '@angular/core';
import { MenuItemInterface } from './menu-item.interface';
import { MenuItemsData } from './menu-items.data';
import { HeaderComponent } from './../header/header.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input() hamburgerMenu: boolean;
  items: MenuItemInterface[] = [];

  constructor() { }

  ngOnInit() {
    this.items = MenuItemsData;
  }

}
