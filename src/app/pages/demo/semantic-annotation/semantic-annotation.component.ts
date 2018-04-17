import { Component, OnInit, Input } from '@angular/core';
import { ApiRequestService } from '../api-request.service';
import { SemanticAnnotationData } from './semantic-annotation.data';
import { DefaultInputData } from '../demo.component.data';

@Component({
  selector: 'app-semantic-annotation',
  templateUrl: './semantic-annotation.component.html',
  styleUrls: ['./semantic-annotation.component.css'],
  providers: [ApiRequestService]
})
export class SemanticAnnotationComponent implements OnInit {

  formData = {};
  @Input() advanced: boolean;
  loading: boolean;
  showResults: boolean;

  response: any;

  constructor(private apiRequestService: ApiRequestService) {
    this.apiRequestService.setEndpoint('semantic-annotation');
  }

  ngOnInit() {

    this.formData = {
      'abstract': SemanticAnnotationData.abstractText,
      'keywords': SemanticAnnotationData.keywords,
      'language': DefaultInputData.defaultLanguage(),
      'lsa': DefaultInputData.defaultMetricOptions.lsa.English(),
      'lda': DefaultInputData.defaultMetricOptions.lda.English(),
      'word2vec': DefaultInputData.defaultMetricOptions.word2vec.English(),
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
      'abstract': this.formData['abstract'],
      'keywords': this.formData['keywords'],
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
