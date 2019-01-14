import { Component, OnInit, Input } from '@angular/core';
import { DefaultInputData } from '../demo.component.data';
import { ApiRequestService } from '../api-request.service';
import { SemDiffData } from './sem-diff.data';
import { ReaderBenchService } from '../../../readerbench.service';

@Component({
  selector: 'app-sem-diff',
  templateUrl: './sem-diff.component.html',
  styleUrls: ['./sem-diff.component.css'],
  providers: [ApiRequestService, ReaderBenchService]
})
export class SemDiffComponent implements OnInit {

  formData: any;
  @Input() advanced: boolean;
  loading: boolean;
  showResults: boolean;
  language: any;
  number_of_docs: any;

  showReadingStrategies: boolean;
  dataResponse: any;

  response: any;

  constructor(private apiRequestService: ApiRequestService, private readerbenchService: ReaderBenchService) {
    this.apiRequestService.setApiService(SemDiffData.serviceName);
  }

  ngOnInit() {
    this.language = SemDiffData.defaultLanguage;
    this.number_of_docs = SemDiffData.default_number_of_docs;

    this.formData = {
      'text': SemDiffData.defaultText,
      'number_of_docs': SemDiffData.default_number_of_docs,
      'language': SemDiffData.defaultLanguage,
      'preposition': true,
      'interjection': true,
      'conjunction': true,
      'pronoun': false
    };
    this.loadSemModels();
    this.loading = false;
    this.showResults = false;
  }

  loadSemModels() {
    this.formData['word2vec'] = DefaultInputData.defaultMetricOptions.word2vec[this.language.value]();
  }

  advancedEmitter($event) {
    this.advanced = $event;
  }

  languageEmitter($event) {
    this.language = $event;
    this.loadSemModels();
  }

  process() {
    this.loading = true;
    this.showResults = true;
    this.showReadingStrategies = false;

    const data = {
      'text': this.formData['text'],
      'language': this.formData['language'].value,
      'number_of_docs': parseInt(this.formData['number_of_docs'].value, 10),
      'w2v': this.formData['word2vec'].value,
      'preposition': this.formData['preposition'],
      'interjection': this.formData['interjection'],
      'conjunction': this.formData['conjunction'],
      'pronoun': this.formData['pronoun']
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
      this.dataResponse = response.data;

      const readerbenchService = this.readerbenchService;
      this.showResults = true;
    });
  }

}
