import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import * as _ from 'underscore';

@Injectable()
export class ReaderBenchService {

  constructor() { }

  public log(...x: any[]) {
    for (let i = 0; i < x.length; i++) {
      console.log(x);
    }
    return x;
  }

  public logError(...x: any[]) {
    for (let i = 0; i < x.length; i++) {
      console.error(x);
    }
    return x;
  }

  public courseDescriptionToggle(element = '.course-description-list'): void {
    const courseDescription = jQuery(element);
    const courseLessons = courseDescription.find('.lesson');
    courseLessons.each(function () {
      const lesson = jQuery(this),
        lessonDescription = lesson.find('> .lesson-description'),
        lessonDescriptionItems = lessonDescription.find('> li');

      lesson.find('> .heading > .lesson-nr').on('click', function () {
        lessonDescription.toggleClass('visible');

        if (lessonDescription.hasClass('visible')) {
          // lessonDescription.velocity('slideDown', { duration: 200 });
          lessonDescription.show();

          lessonDescriptionItems.each(function (i) {
            const obj = jQuery(this);
            setTimeout(function () {
              obj.find('.icon').addClass('visible');
            }, 100 * (i + 1));
          });
        } else {
          // lessonDescription.velocity('slideUp', { duration: 170 });
          lessonDescription.hide();

          lessonDescriptionItems.each(function (i) {
            const obj = jQuery(this);
            obj.find('.icon').removeClass('visible');
          });
        }
      });
    });
  }

  public objectKeys(object) {
    return Object.keys(object);
  }

  public isUndefinedOrNull(object: Object, parameterStack?: string): boolean {
    if (_.isUndefined(object) || _.isNull(object)) {
      return true;
    }
    if (!_.isUndefined(parameterStack) && !_.isNull(parameterStack)) {
      let currentObject = object;
      const parameterStackArray: string[] = parameterStack.split('.');
      for (let i = 0; i < parameterStackArray.length; i++) {
        const param = parameterStackArray[i];
        currentObject = currentObject[param];
        if (_.isUndefined(currentObject) || _.isNull(currentObject)) {
          return true;
        }
      }
    }
    return false;
  }

  public roundNumberToTwoDecimals(inputNumber: number): number {
    if (this.isUndefinedOrNull(inputNumber) || !_.isNumber(inputNumber)) {
      return inputNumber;
    }
    return Math.round(inputNumber * 100) / 100;
  }

  public getObjectValueByPropertyStack(object: Object, parameterStack: string): any {
    if (this.isUndefinedOrNull(object, parameterStack)) {
      return null;
    }
    let currentObject = object;
    const parameterStackArray: string[] = parameterStack.split('.');
    for (let i = 0; i < parameterStackArray.length; i++) {
      const param = parameterStackArray[i];
      currentObject = currentObject[param];
    }
    return currentObject;
  }

  componentToHex(c) {
    const hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }

  rgbToHex(r, g, b) {
    return '#' + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
  }

  hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
      return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

}
