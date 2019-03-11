import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticipantComponent } from './participant/participant.component';
import { CommunityCarouselComponent } from './carousel/community-carousel.component';
import { SlideComponent } from './slide/slide.component';
import { ParticipantEvolutionComponent } from './participant/participant-evolution/participant-evolution.component';
import { ClusteredForceLayoutComponent } from './clustered-force-layout/clustered-force-layout.component';
import { MultiLevelEdgeBundlingComponent } from './multi-level-edge-bundling/multi-level-edge-bundling.component';
import { ChordComponent } from './chord-diagram/chord-diagram';
import { CommunityComponent } from './community.component';

@NgModule({
    imports: [
        CommonModule,
    ]
    ,
    declarations: [
        CommunityComponent,
        ParticipantComponent,
        CommunityCarouselComponent,
        SlideComponent,
        ParticipantEvolutionComponent,
        ClusteredForceLayoutComponent,
        MultiLevelEdgeBundlingComponent,
        ChordComponent
    ]
})
export class CommunityModule { }
