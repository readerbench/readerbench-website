import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DefaultInputData } from '../../demo.component.data';
import { Language } from '../../languages.data';

@Component({
  selector: 'app-demo-common-fields',
  templateUrl: './common-fields.component.html',
  styleUrls: ['./common-fields.component.css']
})
export class DemoCommonFieldsComponent implements OnInit {

  @Input() formData: {};
  @Input() language: Language = Language.EN;
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
    this.lsaOptions = DefaultInputData.metricOptions.lsa[this.language];
    this.ldaOptions = DefaultInputData.metricOptions.lda[this.language];
    this.word2vecOptions = DefaultInputData.metricOptions.word2vec[this.language];
    this.posTaggingOptions = DefaultInputData.posTaggingOptions;
    this.dialogismOptions = DefaultInputData.dialogismOptions;
  }

  toggleAdvanced() {
    this.advanced = !this.advanced;
    this.advancedEmitter.emit(this.advanced);
  }

}
