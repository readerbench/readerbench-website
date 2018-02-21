import { Component } from '@angular/core';

import { teslaThemes } from './scripts/app.options';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  
  ngOnInit() {
  }

  ngAfterViewInit(){

    // jQuery('body').addClass('dom-ready');
    teslaThemes.init();

		setTimeout(function() {
      document.getElementsByTagName('body')[0].className += ' ' + 'dom-ready';
    }, 200);

  }

}
