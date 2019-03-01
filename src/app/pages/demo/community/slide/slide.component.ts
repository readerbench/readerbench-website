import { Component, OnInit, OnDestroy, Input, HostBinding } from '@angular/core';

import { CommunityCarouselComponent, Direction } from '../carousel/community-carousel.component';

@Component({
    selector: 'app-slide',
    template: `
    <div [class.active]="active" class="item text-center">
      <ng-content></ng-content>
    </div>
  `
})
export class SlideComponent implements OnInit, OnDestroy {
    @Input() public index: number;
    @Input() public direction: Direction;

    @HostBinding('class.active')
    @Input() public active: boolean;

    @HostBinding('class.item')
    @HostBinding('class.carousel-item')
    private addClass = true;

    constructor(private carousel: CommunityCarouselComponent) {
    }

    public ngOnInit() {
        this.carousel.addSlide(this);
    }

    public ngOnDestroy() {
        this.carousel.removeSlide(this);
    }
}
