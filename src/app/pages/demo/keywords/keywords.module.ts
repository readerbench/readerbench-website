import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { KeywordsComponent } from './keywords.component';

import { ReaderBenchCommonModule } from '@reader-bench/common';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    ReaderBenchCommonModule
  ],
  exports: [],
  declarations: [],
  providers: []
})
export class KeywordsModule { }
