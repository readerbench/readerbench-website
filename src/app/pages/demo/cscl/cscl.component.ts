import { Component, OnInit, Input } from '@angular/core';
import { ApiRequestService } from '../api-request.service';
import { DefaultInputData } from '../demo.component.data';

@Component({
  selector: 'app-cscl',
  templateUrl: './cscl.component.html',
  styleUrls: ['./cscl.component.css'],
  providers: [ApiRequestService]
})
export class CsclComponent implements OnInit {

  formData = {};
  @Input() advanced: boolean;
  loading: boolean;
  showResults: boolean;

  response: any;

  constructor(private apiRequestService: ApiRequestService) {
    this.apiRequestService.setEndpoint('cscl-processing');
  }

  ngOnInit() {

    this.formData = {
      'language': DefaultInputData.defaultLanguage(),
      'lsa': DefaultInputData.defaultMetricOptions.lsa.EN(),
      'lda': DefaultInputData.defaultMetricOptions.lda.EN(),
      'word2vec': DefaultInputData.defaultMetricOptions.word2vec.EN(),
      'pos-tagging': DefaultInputData.defaultPosTaggingOption(),
      'dialogism': DefaultInputData.defaultDialogismOption(),
      'threshold': DefaultInputData.semanticSimilarityThreshold
    };

    this.loading = false;
    this.showResults = false;  

  }

  advancedEmitter($event) {
    this.advanced = $event;
  }

  process() {
    this.loading = true;
    this.showResults = false;

    var data = {
      'language': this.formData['language'].value,
      'lsa': this.formData['lsa'].value,
      'lda': this.formData['lda'].value,
      'w2v': this.formData['word2vec'].value,
      'pos-tagging': this.formData['pos-tagging'],
      'dialogism': this.formData['dialogism'],
      'threshold': this.formData['threshold']
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
