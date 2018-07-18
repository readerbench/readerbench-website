import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { DemoComponent } from '../pages/demo/demo.component';
import { SentimentAnalysisComponent } from '../pages/demo/sentiment-analysis/sentiment-analysis.component';
import { TextualComplexityComponent } from '../pages/demo/textual-complexity/textual-complexity.component';
import { KeywordsComponent } from '../pages/demo/keywords/keywords.component';
import { SemanticAnnotationComponent } from '../pages/demo/semantic-annotation/semantic-annotation.component';
import { SelfExplanationComponent } from '../pages/demo/self-explanation/self-explanation.component';
import { CsclComponent } from '../pages/demo/cscl/cscl.component';
import { CvAnalysisComponent } from '../pages/demo/cv-analysis/cv-analysis.component';
import { LakComponent } from '../pages/demo/lak/lak.component';
import { CommunityComponent } from '../pages/demo/community/community.component';
import { PeopleComponent } from '../pages/people/people.component';
import { ProjectsComponent } from '../pages/projects/projects.component';
import { PublicationsComponent } from '../pages/publications/publications.component';
import { ContactComponent } from '../pages/contact/contact.component';
import { ComprehensionModelComponent } from '../pages/demo/comprehension-model/comprehension-model.component';

const routes: Routes = [
  {
    path: 'demo',
    component: DemoComponent,
  },
  {
    path: 'people',
    component: PeopleComponent,
  },
  {
    path: 'projects',
    component: ProjectsComponent,
  },
  {
    path: 'publications',
    component: PublicationsComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'demo/sentiment-analysis',
    component: SentimentAnalysisComponent,
  },
  {
    path: 'demo/textual-complexity',
    component: TextualComplexityComponent,
  },
  {
    path: 'demo/keywords',
    component: KeywordsComponent,
  },
  {
    path: 'demo/semantic-annotation',
    component: SemanticAnnotationComponent,
  },
  {
    path: 'demo/self-explanation',
    component: SelfExplanationComponent,
  },
  {
    path: 'demo/cscl',
    component: CsclComponent,
  },
  {
    path: 'demo/cv-analysis',
    component: CvAnalysisComponent,
  },
  {
    path: 'demo/lak',
    component: LakComponent,
  },
  {
    path: 'demo/community',
    component: CommunityComponent,
  },
  {
    path: 'demo/amoc',
    component: ComprehensionModelComponent,
  },
  {
    path: '',
    component: HomeComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule {

}
