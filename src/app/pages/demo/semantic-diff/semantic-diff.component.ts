import { Component, OnInit, Input } from '@angular/core';
import { SemanticDiffData } from './semantic-diff.data';
import { DefaultInputData } from '../demo.component.data';
import { ApiRequestService } from '../api-request.service';

@Component({
  selector: 'app-semantic-diff',
  templateUrl: './semantic-diff.component.html',
  styleUrls: ['./semantic-diff.component.css'],
  providers: [ApiRequestService]
})
export class SemanticDiffComponent implements OnInit {
	componentTitle: string;
	languages: any;
  language: any;
	formData = {};
	diffStrategies: any;
	similarityTypes: any;
  @Input() advanced: boolean;
  response: any;
  loading: boolean;
  showResults: boolean;

	constructor(private apiRequestService: ApiRequestService) {
    this.apiRequestService.setEndpoint('semantic-diff');
  }

  ngOnInit() {
  	this.componentTitle = SemanticDiffData.componentTitle;
  	this.languages = SemanticDiffData.languages;
  	this.language = SemanticDiffData.defaultLanguage;
  	this.formData = {
      'originalText': SemanticDiffData.originalText,
      'revisedText': SemanticDiffData.revisedText,
      'language': this.language,
      'diffStrategy': SemanticDiffData.defaultDiffStrategy().value,
      'similarityType': SemanticDiffData.defaultSimilarityType().value,
    };
    this.loadSemanticModels()

    this.diffStrategies = SemanticDiffData.diffStrategies;
    this.similarityTypes = SemanticDiffData.similarityTypes;

    this.advanced = false;
    this.loading = false;
    this.showResults = false;
  }

  advancedEmitter($event) {
    this.advanced = $event;
  }

  languageEmitter($event) {
    this.language = $event;
    this.loadSemanticModels();
  }

  loadSemanticModels() {
    var languageValue = this.language.value;
    this.formData['lsa'] = DefaultInputData.defaultMetricOptions.lsa[languageValue]();
    this.formData['lda'] = DefaultInputData.defaultMetricOptions.lda[languageValue]();
    this.formData['word2vec'] = DefaultInputData.defaultMetricOptions.word2vec[languageValue]();
  }

  process() {
    this.loading = true;
    this.showResults = false;

    var data = {
      'originalText': this.formData['originalText'],
      'revisedText': this.formData['revisedText'],
      'language': this.formData['language'].value,
      'diffType': this.formData['diffStrategy'],
      'similarityType': this.formData['similarityType'],
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
