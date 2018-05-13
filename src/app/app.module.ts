import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

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
import { KeywordsComponent } from './pages/demo/keywords/keywords.component';
import { SemanticAnnotationComponent } from './pages/demo/semantic-annotation/semantic-annotation.component';
import { SelfExplanationComponent } from './pages/demo/self-explanation/self-explanation.component';
import { CsclComponent } from './pages/demo/cscl/cscl.component';
import { CvAnalysisComponent } from './pages/demo/cv-analysis/cv-analysis.component';
import { LakComponent } from './pages/demo/lak/lak.component';
import { CommunityComponent } from './pages/demo/community/community.component';
import { CIModelComponent } from './pages/demo/cm/CIModel.component';

import { DemoServicesComponent } from './pages/demo/sections/services/services.component';
import { DemoCommonFieldsComponent } from './pages/demo/sections/common-fields/common-fields.component';

import { ReaderBenchCommonModule } from '@reader-bench/common';
import { KeywordsModule } from './pages/demo/keywords/keywords.module';

import 'jquery';
import { PeopleComponent } from './pages/people/people.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { PublicationsComponent } from './pages/publications/publications.component';
import { ContactComponent } from './pages/contact/contact.component';

import { CIModelModule } from "./pages/demo/cm/CIModel.module";
import { AppContext } from './pages/demo/cm/AppContext';
import { RbHttp } from './pages/demo/cm/http/RbHttp';
import { IRbHttp } from './pages/demo/cm/http/IRbHttp';
import { IToaster } from './pages/demo/cm/toaster/IToaster';
import { Toaster } from './pages/demo/cm/toaster/Toaster';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        MenuComponent,
        HomeComponent,
        CarouselComponent,
        AboutComponent,
        BrowseComponent,
        DemoComponent,
        DemoMenuComponent,
        SentimentAnalysisComponent,
        TextualComplexityComponent,
        KeywordsComponent,
        SemanticAnnotationComponent,
        SelfExplanationComponent,
        CsclComponent,
        CvAnalysisComponent,
        LakComponent,
        CommunityComponent,
        DemoServicesComponent,
        DemoCommonFieldsComponent,
        PeopleComponent,
        ProjectsComponent,
        PublicationsComponent,
        ContactComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpModule,
        KeywordsModule,
        ReaderBenchCommonModule,
        CIModelModule
    ],
    exports: [KeywordsComponent],
    providers: [
        AppContext,
        { provide: IRbHttp, useClass: RbHttp },
        { provide: IToaster, useClass: Toaster },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
