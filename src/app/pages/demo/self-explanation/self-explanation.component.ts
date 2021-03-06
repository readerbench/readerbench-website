import { Component, OnInit, Input } from '@angular/core';
import { DefaultInputData } from '../demo.component.data';
import { ApiRequestService } from '../api-request.service';
import { SelfExplanationData } from './self-explanation.data';
import { Language } from '../languages.data';
import { ReaderBenchService } from '../../../readerbench.service';

@Component({
  selector: 'app-self-explanation',
  templateUrl: './self-explanation.component.html',
  styleUrls: ['./self-explanation.component.css'],
  providers: [ApiRequestService, ReaderBenchService]
})
export class SelfExplanationComponent implements OnInit {

  formData: any;
  @Input() advanced: boolean;
  loading: boolean;
  showResults: boolean;
  language: any;

  showReadingStrategies: boolean;
  selfExplanationColored: any;
  strategies: any;

  response: any;

  constructor(private apiRequestService: ApiRequestService, private readerbenchService: ReaderBenchService) {
    this.apiRequestService.setApiService(SelfExplanationData.serviceName);
  }

  ngOnInit() {
    this.language = SelfExplanationData.defaultLanguage;

    this.formData = {
      'text': SelfExplanationData.defaultText,
      'explanation': SelfExplanationData.defaultExplanation,
      'language': SelfExplanationData.defaultLanguage,
      'pos-tagging': DefaultInputData.defaultPosTaggingOption(),
      'dialogism': DefaultInputData.defaultDialogismOption()
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
    this.showReadingStrategies = false;

    const data = {
      'text': this.formData['text'],
      'explanation': this.formData['explanation'],
      'language': this.formData['language'].value,
      'lsa': this.formData['lsa'].value,
      'lda': this.formData['lda'].value,
      'w2v': this.formData['word2vec'].value,
      'pos-tagging': this.formData['pos-tagging'],
      'dialogism': this.formData['dialogism']
    };

    const process = this.apiRequestService.process(data);
    process.subscribe(response => {
      this.response = response;
      this.loading = false;

      if (response.success !== true) {
        alert('Server error occured!');
        return;
      }

      this.showReadingStrategies = true;
      this.selfExplanationColored = response.data.selfExplanationColored;
      this.strategies = response.data.strategies;
      const aux = this.strategies;
      const readerbenchService = this.readerbenchService;
      const interval = setInterval(function () {
        if (aux.count === response.data.strategies.count) {
          clearInterval(interval);
          readerbenchService.courseDescriptionToggle();
        }
      }, 1000);

      this.showResults = true;
    });
  }

}
