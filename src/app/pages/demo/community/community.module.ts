import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunityComponent } from './community.component';
import { ParticipantComponent } from './participant/participant.component';
import { CarouselComponent } from './carousel/carousel.component';
import { SlideComponent } from './slide/slide.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CommunityComponent, ParticipantComponent, CarouselComponent, SlideComponent]
})
export class CommunityModule { }
