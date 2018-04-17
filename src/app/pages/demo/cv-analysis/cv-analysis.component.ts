import { Component, OnInit, Input } from '@angular/core';
import { ApiRequestService } from '../api-request.service';
import { CvAnalysisData } from './cv-analysis.data';
import { DefaultInputData } from '../demo.component.data';

@Component({
  selector: 'app-cv-analysis',
  templateUrl: './cv-analysis.component.html',
  styleUrls: ['./cv-analysis.component.css'],
  providers: [ApiRequestService]
})
export class CvAnalysisComponent implements OnInit {

  formData = {};
  @Input() advanced: boolean;
  loading: boolean;
  showResults: boolean;
  language: any;

  response: any;

  constructor(private apiRequestService: ApiRequestService) {
    this.apiRequestService.setEndpoint('cv-processing');
  }

  ngOnInit() {
    this.language = CvAnalysisData.defaultLanguage.value;

    this.loadSemanticModels();
    this.formData = {
      'keywords': CvAnalysisData.keywords,
      'ignore': CvAnalysisData.ignore,
      'language': DefaultInputData.defaultLanguage(),
      'pos-tagging': DefaultInputData.defaultPosTaggingOption(),
      'dialogism': DefaultInputData.defaultDialogismOption(),
      'threshold': DefaultInputData.semanticSimilarityThreshold
    };

    this.loading = false;
    this.showResults = false;  

  }

  loadSemanticModels() {
    this.formData['lsa'] = DefaultInputData.defaultMetricOptions.lsa[this.language]();
    this.formData['lda'] = DefaultInputData.defaultMetricOptions.lda[this.language]();
    this.formData['word2vec'] = DefaultInputData.defaultMetricOptions.word2vec[this.language]();
  }

  advancedEmitter($event) {
    this.advanced = $event;
  }

  process() {
    this.loading = true;
    this.showResults = false;

    var data = {
      'keywords': this.formData['keywords'],
      'ignore': this.formData['ignore'],
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
