import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { UiSwitchModule } from 'ngx-ui-switch';

import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './sections/header/header.component';
import { MenuComponent } from './sections/menu/menu.component';
import { HomeComponent } from './pages/home/home.component';
import { CarouselComponent } from './pages/home/sections/carousel/carousel.component';
import { AboutComponent } from './pages/home/sections/about/about.component';
import { BrowseComponent } from './pages/home/sections/browse/browse.component';

import { DemoComponent } from './pages/demo/demo.component';
import { DemoMenuComponent } from './pages/demo/sections/menu/menu.component';
import { SentimentAnalysisComponent } from './pages/demo/sentiment-analysis/sentiment-analysis.component';
import { TextualComplexityComponent } from './pages/demo/textual-complexity/textual-complexity.component';
import { ComprehensionModelComponent } from './pages/demo/comprehension-model/comprehension-model.component';
import { CMScoresTableComponent } from './pages/demo/comprehension-model/scores-table/cm-scores-table.component';
import { EdgeBundlingDiagramComponent } from './pages/demo/comprehension-model/edge-bundling-diagram/edge-bundling-diagram.component';
import { KeywordsComponent } from './pages/demo/keywords/keywords.component';
import { SemanticAnnotationComponent } from './pages/demo/semantic-annotation/semantic-annotation.component';
import { SelfExplanationComponent } from './pages/demo/self-explanation/self-explanation.component';
import { CsclOldComponent } from './pages/demo/cscl-old/cscl-old.component';
import { CvAnalysisComponent } from './pages/demo/cv-analysis/cv-analysis.component';
import { LakComponent } from './pages/demo/lak/lak.component';
import { CommunityComponent } from './pages/demo/community/community.component';
import { SemDiffComponent } from './pages/demo/sem-diff/sem-diff.component';
import { ParticipantComponent } from './pages/demo/community/participant/participant.component';
import { ParticipantEvolutionComponent } from './pages/demo/community/participant/participant-evolution/participant-evolution.component';
import { CommunityCarouselComponent } from './pages/demo/community/carousel/community-carousel.component';
import { SlideComponent } from './pages/demo/community/slide/slide.component';
import { CommunityKeywordsHeatmapComponent } from './pages/demo/community/keywords-heatmap/keywords-heatmap.component';
import { ClusteredForceLayoutComponent } from './pages/demo/community/clustered-force-layout/clustered-force-layout.component';
import { MultiLevelEdgeBundlingComponent } from './pages/demo/community/multi-level-edge-bundling/multi-level-edge-bundling.component';

import { ExperimentsComponent } from './pages/experiments/experiments.component';
import { ExperimentsMenuComponent } from './pages/experiments/sections/menu/menu.component';
import { ExperimentsServicesComponent }  from './pages/experiments/sections/services/services.component'
import { IntellitComponent } from './pages/experiments/intellit/intellit.component';

import { DemoServicesComponent } from './pages/demo/sections/services/services.component';
import { DemoCommonFieldsComponent } from './pages/demo/sections/common-fields/common-fields.component';
import { DemoSemDiffCommonFieldsComponent } from './pages/demo/sections/sem-diff-common-fields/sem-diff-common-fields.component';
import { ReaderBenchCommonModule } from '@reader-bench/common';
import { KeywordsModule } from './pages/demo/keywords/keywords.module';

import { EssayFeedbackComponent } from './pages/demo/essay-feedback/essay-feedback.component';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// Import library module
import { NgxSpinnerModule } from 'ngx-spinner';

import 'jquery';
import { PeopleComponent } from './pages/people/people.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { PublicationsComponent } from './pages/publications/publications.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ApproximationPipe } from './pipes/approximation.pipe';

import { ConfigService } from './config/config.service';
import { ApiRequestService } from './pages/demo/api-request.service';
import { ReaderBenchService } from './readerbench.service';
import { EdgeBundlingService } from './pages/demo/comprehension-model/service/edge-bundling.service';
import { ConfigComponent } from './config/config.component';
import { HierarchicalEdgeBundlingComponent } from './hierarchical-edge-bundling/hierarchical-edge-bundling.component';
import { ChordComponent } from './pages/demo/community/chord-diagram/chord-diagram';
import { KeywordsHeatmapComponent } from './pages/demo/keywords-heatmap/keywords-heatmap.component';
import { CurriculumRecommendationComponent } from './pages/demo/curriculum-recomandation/curriculum-recommendation.component';
import {NgbAccordion, NgbAccordionModule, NgbModule, NgbRatingModule} from '@ng-bootstrap/ng-bootstrap';
import { DocumentAnalysisComponent } from './pages/demo/document-analysis/document-analysis';
import { Ng5SliderModule } from 'ng5-slider';
import { MultiDocumentCohesionGridComponent } from './pages/demo/document-analysis/multi-document-cohesion-grid/multi-document-cohesion-grid';
import { CsclComponent } from './pages/demo/cscl/cscl.component';
import { MultiDocumentHierarchicalViewComponent } from './pages/demo/document-analysis/multi-document-hierarchical/multi-document-hierarchical';
import { DropzoneModule, DropzoneConfigInterface, DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import {MatSliderModule} from '@angular/material/slider';
import { AtesComponent } from './pages/projects/ates/ates.component';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: '//readerbench.com/api/v2/file-upload',
  // acceptedFiles: 'image/*',
  createImageThumbnails: true
};

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    ConfigComponent,
    HeaderComponent,
    MenuComponent,
    HomeComponent,
    CarouselComponent,
    AboutComponent,
    BrowseComponent,
    PeopleComponent,
    ProjectsComponent,
    PublicationsComponent,
    ContactComponent,
    DemoComponent,
    DemoMenuComponent,
    SentimentAnalysisComponent,
    CurriculumRecommendationComponent,
    TextualComplexityComponent,
    KeywordsComponent,
    EssayFeedbackComponent,
    IntellitComponent,
    SemanticAnnotationComponent,
    SelfExplanationComponent,
    CsclOldComponent,
    CsclComponent,
    CvAnalysisComponent,
    ComprehensionModelComponent,
    CMScoresTableComponent,
    EdgeBundlingDiagramComponent,
    LakComponent,
    CommunityComponent,
    SemDiffComponent,
    DemoServicesComponent,
    ExperimentsServicesComponent,
    DemoCommonFieldsComponent,
    DemoSemDiffCommonFieldsComponent,
    ApproximationPipe,
    CommunityKeywordsHeatmapComponent,
    KeywordsHeatmapComponent,
    PeopleComponent,
    ProjectsComponent,
    PublicationsComponent,
    ContactComponent,
    ParticipantComponent,
    ParticipantEvolutionComponent,
    CommunityCarouselComponent,
    SlideComponent,
    HierarchicalEdgeBundlingComponent,
    ClusteredForceLayoutComponent,
    MultiLevelEdgeBundlingComponent,
    ChordComponent,
    DocumentAnalysisComponent,
    MultiDocumentCohesionGridComponent,
    ExperimentsComponent,
    ExperimentsMenuComponent,
    AtesComponent,
    MultiDocumentHierarchicalViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    KeywordsModule,
    ReaderBenchCommonModule,
    NgbAccordionModule,
    NgbRatingModule,
    ReaderBenchCommonModule,
    Ng5SliderModule,
    UiSwitchModule,
    DropzoneModule,
    PerfectScrollbarModule,
    NgxSpinnerModule,
    MatSliderModule
  ],
  exports: [
    KeywordsComponent
  ],
  providers: [
    ApiRequestService,
    ConfigService,
    ReaderBenchService,
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [
    AppComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
