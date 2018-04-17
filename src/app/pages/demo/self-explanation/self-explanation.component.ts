import { Component, OnInit } from '@angular/core';
import { DefaultInputData } from '../demo.component.data';
import { ApiRequestService } from '../api-request.service';
import { SelfExplanationData } from './self-explanation.data';
import { Language } from '../languages.data';
import { ReaderbenchService } from '../../../readerbench.service';

@Component({
  selector: 'app-self-explanation',
  templateUrl: './self-explanation.component.html',
  styleUrls: ['./self-explanation.component.css'],
  providers: [ApiRequestService, ReaderbenchService]
})
export class SelfExplanationComponent implements OnInit {

  formData = {};
  advanced: boolean;
  loading: boolean;
  showResults: boolean;
  language: any;

  showReadingStrategies: boolean;
  selfExplanationColored: any;
  strategies: any;

  response: any;

  constructor(private apiRequestService: ApiRequestService, private readerbenchService: ReaderbenchService) {
    this.apiRequestService.setEndpoint('self-explanation');
  }

  ngOnInit() {
    this.language = SelfExplanationData.defaultLanguage.value;

    this.formData = {
      'text': SelfExplanationData.defaultText,
      'explanation': SelfExplanationData.defaultExplanation,
      'language': SelfExplanationData.defaultLanguage,
      'lsa': DefaultInputData.defaultMetricOptions.lsa[this.language](),
      'lda': DefaultInputData.defaultMetricOptions.lda[this.language](),
      'word2vec': DefaultInputData.defaultMetricOptions.word2vec[this.language](),
      'pos-tagging': DefaultInputData.defaultPosTaggingOption(),
      'dialogism': DefaultInputData.defaultDialogismOption()
    };
    this.loading = false;
    this.showResults = false;
  }

  process() {
    this.loading = true;
    this.showResults = false;
    this.showReadingStrategies = false;

    var data = {
      'text': this.formData['text'],
      'explanation': this.formData['explanation'],
      'language': this.formData['language'].value,
      'lsa': this.formData['lsa'].value,
      'lda': this.formData['lda'].value,
      'w2v': this.formData['word2vec'].value,
      'pos-tagging': this.formData['pos-tagging'],
      'dialogism': this.formData['dialogism']
    }

    var process = this.apiRequestService.process(data);
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
      var aux = this.strategies;
      var readerbenchService = this.readerbenchService;
      var interval = setInterval(function () {
        if (aux.count === response.data.strategies.count) {
          clearInterval(interval);
          readerbenchService.courseDescriptionToggle();
        }
      }, 1000);

      this.showResults = true;
    });
  }

}
