import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { ReaderBenchCommonModule } from '@reader-bench/common';
import { SharedComponentsModule } from "../common/components/SharedComponentsModule";
import { SharedPipesModule } from "../common/pipes/SharedPipesModule";

@NgModule({
    imports: [ 
        FormsModule, 
        BrowserModule, 
        CommonModule, 
        SharedComponentsModule, 
        SharedPipesModule, 
        ReaderBenchCommonModule
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class CIModelModule { }