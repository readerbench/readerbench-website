import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunityComponent } from './community.component';
import { ParticipantComponent } from './participant/participant.component';
import { CommunityCarouselComponent } from './carousel/community-carousel.component';
import { SlideComponent } from './slide/slide.component';

@NgModule({
  declarations: [
  	CommunityComponent,
  	ParticipantComponent,
  	CommunityCarouselComponent,
  	SlideComponent
  ],
  imports: [
    CommonModule, 
  ]
})
export class CommunityModule { }
