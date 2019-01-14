import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DefaultInputData } from '../../demo.component.data';
import { SemDiffData } from '../../sem-diff/sem-diff.data';
import { Language } from '../../languages.data';

@Component({
  selector: 'app-demo-sem-diff-common-fields',
  templateUrl: './sem-diff-common-fields.component.html',
  styleUrls: ['./sem-diff-common-fields.component.css']
})
export class DemoSemDiffCommonFieldsComponent implements OnInit {

  @Input() formData: any;
  @Input() language: any;
  @Output() advanced: boolean;
  @Output() advancedEmitter = new EventEmitter<any>();
  @Output() languageEmitter = new EventEmitter<any>();
  
  languages: any;
  word2vecOptions: any;
  number_of_docs: any;

  constructor() { }

  ngOnInit() {
    this.advanced = false;
    this.languages = SemDiffData.languages;
    this.language = this.formData['language'];
    this.number_of_docs = DefaultInputData.number_of_docs;
    this.loadSemModelsOptions();    
  }

  loadSemModelsOptions() {
    var languageValue = this.language.value;
    this.word2vecOptions = DefaultInputData.metricOptions.word2vec[languageValue];
    
  }

  onChangeLanguage($newLanguage) {
    this.language = $newLanguage;
    this.loadSemModelsOptions();
    this.languageEmitter.emit(this.language);
  }

  toggleAdvanced() {
    this.advanced = !this.advanced;
    this.advancedEmitter.emit(this.advanced);
  }

}
