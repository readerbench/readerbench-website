import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunityComponent } from './community.component';
import { ParticipantComponent } from './participant/participant.component';
import { CommunityCarouselComponent } from './carousel/community-carousel.component';
import { SlideComponent } from './slide/slide.component';
import { ParticipantEvolutionComponent } from './participant/participant-evolution/participant-evolution.component';
import { KeywordsHeatmapComponent } from './keywords-heatmap/keywords-heatmap.component';
import { ClusteredForceLayoutComponent } from './clustered-force-layout/clustered-force-layout.component';
import { MultiLevelEdgeBundlingComponent } from './multi-level-edge-bundling/multi-level-edge-bundling.component';

@NgModule({
  declarations: [
  	CommunityComponent,
  	ParticipantComponent,
  	CommunityCarouselComponent,
  	SlideComponent,
  	ParticipantEvolutionComponent,
  	KeywordsHeatmapComponent,
  	ClusteredForceLayoutComponent,
  	MultiLevelEdgeBundlingComponent
  ],
  imports: [
    CommonModule, 
  ]
})
export class CommunityModule { }
