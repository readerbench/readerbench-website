import { Component, OnInit, Input } from '@angular/core';
import { DefaultInputData } from '../demo.component.data';
import { ApiRequestService } from '../api-request.service';
import { ReaderBenchService } from '../../../readerbench.service';
import { TwoModeGraphService } from '../../../two-mode-graph.service';
import { DemoCommonFieldsComponent } from '../sections/common-fields/common-fields.component';
import { Language } from '../languages.data';
import { KeywordsData } from './keywords.data';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-keywords',
  templateUrl: './keywords.component.html',
  styleUrls: ['./keywords.component.css'],
  providers: [ApiRequestService, ReaderBenchService, TwoModeGraphService]
})
export class KeywordsComponent implements OnInit {

  formData: any;
  @Input() advanced: boolean;
  loading: boolean;
  showResults: boolean;
  languages: any;
  language: any;

  response: any;

  myGraph: any;
  error: string;

  value: any;

  constructor(private myApp: AppComponent,
    private readerbenchService: ReaderBenchService,
    private twoModeGraphService: TwoModeGraphService) {
    this.myApp.apiRequestService.setApiService(KeywordsData.serviceName);
    this.myApp.apiRequestService.setHeaders(this.myApp.apiRequestService.HEADERS_TYPE_FILE_UPLOAD);
  }

  ngOnInit() {
    this.languages = KeywordsData.languages;
    this.language = KeywordsData.defaultLanguage;

    this.formData = {
      'text': DefaultInputData.text,
      'language': this.language,
      'pos-tagging': DefaultInputData.defaultPosTaggingOption(),
      'threshold': DefaultInputData.semanticSimilarityThreshold,
      'bigrams': DefaultInputData.defaultBigrams
    };
    this.loadSemanticModels();

    this.loading = false;
    this.showResults = false;
  }

  loadSemanticModels() {
    const languageValue = this.language.value;
    this.formData['lsa'] = DefaultInputData.defaultMetricOptions.lsa[languageValue]();
    this.formData['lda'] = DefaultInputData.defaultMetricOptions.lda[languageValue]();
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
      'language': this.formData['language'].value,
      'lsa': this.formData['lsa'].value,
      'lda': this.formData['lda'].value,
      'w2v': this.formData['word2vec'].value,
      'pos-tagging': this.formData['pos-tagging'],
      'threshold': this.formData['threshold'],
      'bigrams': this.formData['bigrams']
    };

    const process = this.myApp.apiRequestService.process(data);
    process.subscribe(response => {
      this.response = response;
      this.loading = false;

      if (response.success !== true) {
        alert('Server error occured!');
        return;
      }

      const conceptGraph = {
        nodeList: response.data.nodeList,
        edgeList: response.data.edgeList,
      };

      this.twoModeGraphService.getGraph(conceptGraph).subscribe(
        graph => { this.myGraph = graph; },
        error => { this.error = error.message; },
        () => {
        }
      );

      this.showResults = true;

    });
  }

  // downloadCsv() {
  //   this.readerbenchService.downloadCsv(this.response.)
  // }

}
