import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AtesData } from './ates.data';

@Component({
  selector: 'app-ates',
  templateUrl: './ates.component.html',
  styleUrls: ['./ates.component.css']
})
export class AtesComponent implements OnInit, AfterViewInit {

  data: any;

  constructor() { }
  ngAfterViewInit(): void {
    this.parallaxInit();
  }

  ngOnInit(): void {
    this.data = AtesData;
  }

  private parallaxInit(): void {
    const container = jQuery('[data-parallax-bg]');
    console.log(container);

    if (container.length) {
      container.each(function (index) {
        const boxImg = container.eq(index),
          boxImgData = boxImg.data('parallax-bg'),
          parallaxBox = boxImg.find('.box-img > span');

        parallaxBox.css({
          'background-image': 'url("' + boxImgData + '")'
        });

        function scrollEffect() {
          const elCont = container[index],
            el = elCont.getBoundingClientRect(),
            wHeight = jQuery(window).height(),
            scrl = wHeight - (el.bottom - el.height),
            scrollBox = boxImg.children('.box-img'),
            condition = wHeight + el.height,
            progressCoef = scrl / condition;

          if (scrl > 0 && scrl < condition) {
            scrollBox.css({
              transform: 'translateY(' + (progressCoef * 100) + 'px)'
            });
          }
        }

        scrollEffect();

        jQuery(window).scroll(function () {
          scrollEffect();
        });
      });
    }
  }

}
