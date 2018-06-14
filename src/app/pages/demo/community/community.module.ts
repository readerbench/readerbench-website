import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunityComponent } from './community.component';
import { ParticipantComponent } from './participant/participant.component';
import { CommunityCarouselComponent } from './carousel/community-carousel.component';
import { SlideComponent } from './slide/slide.component';
import { ParticipantEvolutionComponent } from './participant/participant-evolution/participant-evolution.component';
import { KeywordsHeatmapComponent } from './keywords-heatmap/keywords-heatmap.component';

@NgModule({
  declarations: [
  	CommunityComponent,
  	ParticipantComponent,
  	CommunityCarouselComponent,
  	SlideComponent,
  	ParticipantEvolutionComponent,
  	KeywordsHeatmapComponent
  ],
  imports: [
    CommonModule, 
  ]
})
export class CommunityModule { }
