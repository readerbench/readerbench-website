import { Injectable } from '@angular/core';
// import * as d3 from './d3-custom';
import * as d3 from 'd3';
import * as _ from 'underscore';

@Injectable()
export class ReaderbenchService {

  constructor() { }

  log(x) {
    console.log(x);
    return x;
  }

  courseDescriptionToggle(element = '.course-description-list'): void {
    var courseDescription = jQuery(element);
    var courseLessons = courseDescription.find('.lesson');
    courseLessons.each(function () {
      var lesson = jQuery(this),
        lessonDescription = lesson.find('> .lesson-description'),
        lessonDescriptionItems = lessonDescription.find('> li');

      lesson.find('> .heading > .lesson-nr').on('click', function () {
        lessonDescription.toggleClass('visible');

        if (lessonDescription.hasClass('visible')) {
          // lessonDescription.velocity('slideDown', { duration: 200 });
          lessonDescription.show();

          lessonDescriptionItems.each(function (i) {
            var obj = jQuery(this);
            setTimeout(function () {
              obj.find('.icon').addClass('visible');
            }, 100 * (i + 1));
          });
        } else {
          // lessonDescription.velocity('slideUp', { duration: 170 });
          lessonDescription.hide();

          lessonDescriptionItems.each(function (i) {
            var obj = jQuery(this);
            obj.find('.icon').removeClass('visible');
          });
        }
      });
    });
  }

  public isUndefinedOrNull(object: Object, parameterStack?: string): boolean {
    if (_.isUndefined(object) || _.isNull(object)) {
      return true;
    }
    if (!_.isUndefined(parameterStack) && !_.isNull(parameterStack)) {
      var currentObject = object;
      var parameterStackArray: string[] = parameterStack.split(".");
      for (var i = 0; i < parameterStackArray.length; i++) {
        var param = parameterStackArray[i];
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
    var currentObject = object;
    var parameterStackArray: string[] = parameterStack.split(".");
    for (var i = 0; i < parameterStackArray.length; i++) {
      var param = parameterStackArray[i];
      currentObject = currentObject[param];
    }
    return currentObject;
  }

}
