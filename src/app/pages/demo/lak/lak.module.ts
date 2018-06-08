import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedComponentsModule } from '../../../common/components/SharedComponentsModule';
import { ArticleAuthorGraphComponent } from './components/graph/ArticleAuthorGraphComponent';
import { GraphMeasuresComponent } from './components/measure-table/GraphMeasuresComponent';
import { LakTopicsComponent } from './components/topics/LakTopicsComponent';
import { LakTopicEvolutionComponent } from "./components/topic-evolution/LakTopicEvolutionComponent";
import { LakComponent } from './lak.component';
import { NodesService } from './services/NodesService';
import { GraphService } from './services/GraphService';
import { GraphMeasureService } from './services/GraphMeasureService';

@NgModule({
    imports: [CommonModule, FormsModule, SharedComponentsModule],
    declarations: [ArticleAuthorGraphComponent, GraphMeasuresComponent, LakComponent, LakTopicsComponent, LakTopicEvolutionComponent],
    exports: [LakComponent],
    providers: [NodesService, GraphService, GraphMeasureService],
})
export class LakModule { }