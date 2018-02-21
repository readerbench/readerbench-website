import { Component, OnInit } from '@angular/core';
import { DefaultInputData } from '../demo.component.data';
import { ApiRequestService } from '../api-request.service';
import { SelfExplanationData } from './self-explanation.data';

@Component({
  selector: 'app-self-explanation',
  templateUrl: './self-explanation.component.html',
  styleUrls: ['./self-explanation.component.css'],
  providers: [ApiRequestService]
})
export class SelfExplanationComponent implements OnInit {

  formData = {};
  advanced: boolean;
  loading: boolean;
  showResults: boolean;

  response: any;

  constructor(private apiRequestService: ApiRequestService) {
    this.apiRequestService.setEndpoint('self-explanation');
  }

  ngOnInit() {
    this.formData = {
      'text': SelfExplanationData.defaultText,
      'explanation': SelfExplanationData.defaultExplanation,
      'language': SelfExplanationData.defaultLanguage,
      'lsa': DefaultInputData.defaultMetricOptions.lsa.FR(),
      'lda': DefaultInputData.defaultMetricOptions.lda.FR(),
      'word2vec': DefaultInputData.defaultMetricOptions.word2vec.FR(),
      'pos-tagging': DefaultInputData.defaultPosTaggingOption(),
      'dialogism': DefaultInputData.defaultDialogismOption()
    };
    this.loading = false;
    this.showResults = false;   
  }

  process() {
    this.loading = true;
    this.showResults = false;

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

      this.showResults = true;
    });
  }

}
