import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DefaultInputData } from '../../demo.component.data';

@Component({
  selector: 'app-demo-common-fields',
  templateUrl: './common-fields.component.html',
  styleUrls: ['./common-fields.component.css']
})
export class DemoCommonFieldsComponent implements OnInit {

  @Input() formData: {};
  @Output() advanced: boolean;
  @Output() advancedEmitter = new EventEmitter<any>();
  
  languages: any;
  lsaOptions: any;
  ldaOptions: any;
  word2vecOptions: any;
  posTaggingOptions: any;
  dialogismOptions: any;

  constructor() { }

  ngOnInit() {
    this.advanced = false;
    this.languages = DefaultInputData.languages;
    this.lsaOptions = DefaultInputData.metricOptions.lsa.EN;
    this.ldaOptions = DefaultInputData.metricOptions.lda.EN;
    this.word2vecOptions = DefaultInputData.metricOptions.word2vec.EN;
    this.posTaggingOptions = DefaultInputData.posTaggingOptions;
    this.dialogismOptions = DefaultInputData.dialogismOptions;
  }

  toggleAdvanced() {
    this.advanced = !this.advanced;
    this.advancedEmitter.emit(this.advanced);
  }

}
