import { Injectable } from '@angular/core';
import * as MobileDetect from 'mobile-detect';

@Injectable()
export class MobileDetectService {

  md: MobileDetect;

  constructor() {
    this.md = new MobileDetect(window.navigator.userAgent);
  }

  mobile(): string {
    return this.md.mobile();
  }

}
