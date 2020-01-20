import { Component, OnInit, Input } from '@angular/core';
import { AppComponent } from '../../app.component';
import { MobileDetectService } from '../../mobile-detect.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [ MobileDetectService ]
})
export class HeaderComponent implements OnInit {

  hamburgerMenu: boolean;

  constructor(public mobileDetectService: MobileDetectService) {  }

  ngOnInit() {
    if (this.mobileDetectService.mobile()) {
      this.hamburgerMenu = false;
    } else {
      this.hamburgerMenu = true;
    }
  }

  openMenu() {
    this.hamburgerMenu = !this.hamburgerMenu;
  }

}
