import { Component } from '@angular/core';
import { ApiRequestService } from './pages/demo/api-request.service';

import { teslaThemes } from './scripts/app.options';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'ReaderBench';
  
  constructor(public apiRequestService: ApiRequestService) {
  }

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
