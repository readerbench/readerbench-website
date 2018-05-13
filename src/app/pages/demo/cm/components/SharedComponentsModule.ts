import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoadingComponent } from './loading/LoadingComponent';
import { SearchInputTextComponent } from './auto-complete-input-search/SearchInputTextComponent';
import { TwoModeGraphComponent } from './two-mode-graph/TwoModeGraphComponent';
import { WordHitmapComponent } from "./word-hitmap/WordHitmapComponent";
import { LandscapeModelComponent } from "./landscape-model/LandscapeModelComponent";

const SharedComponents = [
    LoadingComponent,
    SearchInputTextComponent,
    TwoModeGraphComponent,
    WordHitmapComponent,
    LandscapeModelComponent,
];

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [SharedComponents],
    exports: [SharedComponents]
})
export class SharedComponentsModule { }