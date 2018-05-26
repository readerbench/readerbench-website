import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SearchInputTextComponent } from './auto-complete-input-search/SearchInputTextComponent';
import { WordHitmapComponent } from "./word-hitmap/WordHitmapComponent";

const SharedComponents = [
    SearchInputTextComponent,
    WordHitmapComponent,
];

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [SharedComponents],
    exports: [SharedComponents]
})
export class SharedComponentsModule { }