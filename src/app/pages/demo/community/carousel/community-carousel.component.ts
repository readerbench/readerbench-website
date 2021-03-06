import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { SlideComponent } from '../slide/slide.component';

export enum Direction {UNKNOWN, NEXT, PREV}

@Component({
  selector: 'app-community-carousel',
  template: `
<div (mouseenter)="pause()" (mouseleave)="play()" class="carousel slide">

    <a class="left carousel-control" (click)="prev()" [hidden]="true">
    <!--<span class="glyphicon glyphicon-chevron-left"></span>-->
    </a>
    <a class="right carousel-control" (click)="next()" [hidden]="true">
    <!--<span class="glyphicon glyphicon-chevron-right"></span>-->
    </a>
    <div class="row" style="margin-top: -30px; text-align: center;">
        <div class="col-xs-2"></div>
        <div class="col-xs-8">
            <ul class="pagination pagination-slider" [hidden]="slides.length <= 1">
                <!--<li ><a aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>-->
                <li *ngFor="let slidez of slides; let i=index"  [class.active]="slidez.active === true" (click)="select(slidez)">
                    <a *ngIf="i==0">THE ENTIRE PERIOD</a>
                    <a *ngIf="i!=0">WEEK {{i}}</a>
                </li>
                <!--<li> <a  aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>-->
            </ul>
        </div>
        <div class="col-xs-2"></div>
    </div>
    <div class="carousel-inner"><ng-content></ng-content></div>
</div>
`,
  styleUrls: ['./carousel.component.css'],
})
export class CommunityCarouselComponent implements OnDestroy {
  @Input() public noWrap: boolean;
  @Input() public noPause: boolean;
  @Input() public noTransition: boolean;

  @Input() public get interval(): number {
    return this._interval;
  }

  public set interval(value: number) {
    this._interval = value;
    this.restartTimer();
  }

  public slides: Array<SlideComponent> = [];
  private currentInterval: any;
  private isPlaying: boolean;
  private destroyed = false;
  private currentSlide: SlideComponent;
  private _interval: number;

  public ngOnDestroy() {
    this.destroyed = true;
  }

  public select(nextSlide: SlideComponent, direction: Direction = Direction.UNKNOWN) {
    const nextIndex = nextSlide.index;
    if (direction === Direction.UNKNOWN) {
      direction = nextIndex > this.getCurrentIndex() ? Direction.NEXT : Direction.PREV;
    }

    // Prevent this user-triggered transition from occurring if there is already one in progress
    if (nextSlide && nextSlide !== this.currentSlide) {
      this.goNext(nextSlide, direction);
    }
  }

  private goNext(slide: SlideComponent, direction: Direction) {
    if (this.destroyed) {
      return;
    }

    slide.direction = direction;
    slide.active = true;

    if (this.currentSlide) {
      this.currentSlide.direction = direction;
      this.currentSlide.active = false;
    }

    this.currentSlide = slide;

    // every time you change slides, reset the timer
    this.restartTimer();
  }

  private getSlideByIndex(index: number) {
    const len = this.slides.length;
    for (let i = 0; i < len; ++i) {
      if (this.slides[i].index === index) {
        return this.slides[i];
      }
    }
  }

  private getCurrentIndex() {
    return !this.currentSlide ? 0 : this.currentSlide.index;
  }

  public next() {
    const newIndex = (this.getCurrentIndex() + 1) % this.slides.length;

    if (newIndex === 0 && this.noWrap) {
      this.pause();
      return;
    }

    return this.select(this.getSlideByIndex(newIndex), Direction.NEXT);
  }

  public prev() {
    const newIndex = this.getCurrentIndex() - 1 < 0 ? this.slides.length - 1 : this.getCurrentIndex() - 1;

    if (this.noWrap && newIndex === this.slides.length - 1) {
      this.pause();
      return;
    }

    return this.select(this.getSlideByIndex(newIndex), Direction.PREV);
  }

  private restartTimer() {
    this.resetTimer();
    const interval = +this.interval;
    if (!isNaN(interval) && interval > 0) {
      this.currentInterval = setInterval(() => {
        const nInterval = +this.interval;
        if (this.isPlaying && !isNaN(this.interval) && nInterval > 0 && this.slides.length) {
          this.next();
        } else {
          this.pause();
        }
      }, interval);
    }
  }

  private resetTimer() {
    if (this.currentInterval) {
      clearInterval(this.currentInterval);
      this.currentInterval = null;
    }
  }

  public play() {
    if (!this.isPlaying) {
      this.isPlaying = true;
      this.restartTimer();
    }
  }

  public pause() {
    if (!this.noPause) {
      this.isPlaying = false;
      this.resetTimer();
    }
  }

  public addSlide(slide: SlideComponent) {
    slide.index = this.slides.length;
    this.slides.push(slide);
    if (this.slides.length === 1 || slide.active) {
      this.select(this.slides[this.slides.length - 1]);
      if (this.slides.length === 1) {
        this.play();
      }
    } else {
      slide.active = false;
    }
  }

  public removeSlide(slide: SlideComponent) {
    this.slides.splice(slide.index, 1);

    if (this.slides.length === 0) {
      this.currentSlide = null;
      return;
    }

    for (let i = 0; i < this.slides.length; i++) {
      this.slides[i].index = i;
    }
  }

}
