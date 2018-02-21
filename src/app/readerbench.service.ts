import { Injectable } from '@angular/core';
// import * as d3 from './d3-custom';
import * as d3 from "d3";

@Injectable()
export class ReaderbenchService {

  constructor() { }

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
  
}
