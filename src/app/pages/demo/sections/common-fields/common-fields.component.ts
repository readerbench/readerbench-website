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
  @Input() language: any;
  @Input() languages: any;

  @Output() advanced: boolean;
  @Output() advancedEmitter = new EventEmitter<any>();
  @Output() languageEmitter = new EventEmitter<any>();

  lsaOptions: any;
  ldaOptions: any;
  word2vecOptions: any;
  posTaggingOptions: any;
  dialogismOptions: any;

  constructor() { }

  ngOnInit() {
    this.advanced = false;
    this.posTaggingOptions = DefaultInputData.posTaggingOptions;
    this.dialogismOptions = DefaultInputData.dialogismOptions;
    this.loadSemanticModelsOptions();
  }

  loadSemanticModelsOptions() {
    const languageValue = this.language.value;
    this.lsaOptions = DefaultInputData.metricOptions.lsa[languageValue];
    this.ldaOptions = DefaultInputData.metricOptions.lda[languageValue];
    this.word2vecOptions = DefaultInputData.metricOptions.word2vec[languageValue];
  }

  onChangeLanguage($newLanguage) {
    this.language = $newLanguage;
    this.loadSemanticModelsOptions();
    this.languageEmitter.emit(this.language);
  }

  toggleAdvanced() {
    this.advanced = !this.advanced;
    this.advancedEmitter.emit(this.advanced);
  }

}
