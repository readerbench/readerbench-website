import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { DemoCommonFieldsComponent } from '../sections/common-fields/common-fields.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    DemoCommonFieldsComponent
  ],
  declarations: [DemoCommonFieldsComponent]
})
export class SentimentAnalysisModule {

}
