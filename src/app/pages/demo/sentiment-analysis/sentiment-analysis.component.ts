import { Component, OnInit, Input } from '@angular/core';
import { DemoMenuComponent } from '../sections/menu/menu.component';
import { SentimentAnalysisData } from './sentiment-analysis.data';
import { DefaultInputData } from '../demo.component.data';
import { DemoCommonFieldsComponent } from '../sections/common-fields/common-fields.component';
import { Language } from '../languages.data';
import { AppComponent } from '../../../app.component';

interface Granularity {
  id: string;
  name: string;
  value: number;
}

@Component({
  selector: 'app-demo-sentiment-analysis',
  templateUrl: './sentiment-analysis.component.html',
  styleUrls: ['./sentiment-analysis.component.css']
})

export class SentimentAnalysisComponent implements OnInit {

  sentimentScore: number;
  componentTitle: string;
  formData: any;
  @Input() advanced: boolean;
  loading: boolean;
  showResults: boolean;
  languages: any;
  language: any;
  granularities: any;
  response: any;

  constructor(private myApp: AppComponent) {
    this.myApp.apiRequestService.setApiService(SentimentAnalysisData.serviceName);
    this.myApp.apiRequestService.setHeaders(this.myApp.apiRequestService.HEADERS_TYPE_FILE_UPLOAD);
  }

  ngOnInit() {
    this.componentTitle = SentimentAnalysisData.componentTitle;
    this.languages = SentimentAnalysisData.languages;
    this.language = SentimentAnalysisData.defaultLanguage;
    this.granularities = SentimentAnalysisData.granularities;

    this.formData = {
      'text': SentimentAnalysisData.text,
      'language': this.language,
      'granularity': SentimentAnalysisData.defaultGranularity(),
    };
    this.loadSemanticModels();

    this.advanced = false;
    this.loading = false;
    this.showResults = false;
  }

  loadSemanticModels() {
    const languageValue = this.language.value;
    this.formData['word2vec'] = DefaultInputData.defaultMetricOptions.word2vec[languageValue]();
  }

  advancedEmitter($event) {
    this.advanced = $event;
  }

  languageEmitter($event) {
    this.language = $event;
    this.loadSemanticModels();
  }

  process() {
    this.loading = true;
    this.showResults = false;

    const data = {
      'text': this.formData['text'],
      'lang': this.formData['language'].value,
      'granularity': this.formData['granularity'].value,
    };

    const process = this.myApp.apiRequestService.process(data);
    process.subscribe(response => {
      this.response = response;
      this.loading = false;

      if (response.success !== true) {
        alert('Server error occured!');
        return;
      }

      this.showResults = true;
      this.sentimentScore = response.data.prediction;
    });
  }

  animateProgressBar(element) {
    element.show();
    jQuery(element).width(0);
    jQuery(element).width(
      function () {
        return jQuery(this).attr('aria-valuenow') + '%';
      }
    );
  }

}
