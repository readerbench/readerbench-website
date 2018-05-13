import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { CIModelComponent } from './CIModel.component';
import { CIScoresTableComponent } from "./components/scores-table/CIScoresTableComponent";
import { CommonModule } from "@angular/common";
import { SharedComponentsModule } from "./components/SharedComponentsModule";
import { SharedPipesModule } from "./pipes/SharedPipesModule";

@NgModule({
    imports: [FormsModule, CommonModule, SharedComponentsModule, SharedPipesModule],
    declarations: [CIModelComponent, CIScoresTableComponent],
    exports: [CIModelComponent]
})
export class CIModelModule { }