import { Component, OnInit, Input } from '@angular/core';
import { DefaultInputData } from '../demo.component.data';
import { ApiRequestService } from '../api-request.service';
import { SemDiffData } from './sem-diff.data';
import { ReaderbenchService } from '../../../readerbench.service';

@Component({
  selector: 'app-sem-diff',
  templateUrl: './sem-diff.component.html',
  styleUrls: ['./sem-diff.component.css'],
  providers: [ApiRequestService, ReaderbenchService]
})
export class SemDiffComponent implements OnInit {

  formData = {};
  modalData = {};
  @Input() advanced: boolean;
  loading: boolean;
  showResults: boolean;
  modalDlg:boolean;
  language: any;
  number_of_docs: any;

  showReadingStrategies: boolean;
  dataResponse: any;
  advancedModal: boolean;
  showResultsModal: boolean;
  dataResponseModal: any;
  window_sizeModal: any;
  loadingModal: boolean;
  responseModal: any;

  response: any;

  constructor(private apiRequestService: ApiRequestService, private readerbenchService: ReaderbenchService) {
    this.apiRequestService.setEndpoint('semantic-diff'); // It changes when it process the Process button, or the Modal Button
  }

  ngOnInit() {
    this.language = SemDiffData.defaultLanguage;
    this.number_of_docs = SemDiffData.default_number_of_docs;
    this.advancedModal = false;
    this.window_sizeModal = SemDiffData.window_size;
    this.formData = {
      'text': SemDiffData.defaultText,
      'number_of_docs' : SemDiffData.default_number_of_docs,
      'test_documents' : SemDiffData.test_documents[0],
      'window_size' : SemDiffData.window_size[0],
      'test_search_corpus_offline' : SemDiffData.test_search_corpus_offline[0],
      'language': SemDiffData.defaultLanguage,
      'preposition' : true,
      'interjection' : true,
      'conjunction' : true,
      'pronoun' : true,
      'verbose' : true,
      'ner' : true
    };
    this.modalData = {
      'modalText1': SemDiffData.modalText1,
      'modalText2': SemDiffData.modalText2,
      'window_size' : SemDiffData.window_size[0],
      'preposition' : true,
      'interjection' : true,
      'verbose' : true,
      'conjunction' : true,
      'pronoun' : true,
      'ner' : true
    };
    console.log(this.modalData);
    console.log(this.formData);
    this.loadSemModels();
    this.loading = false; 
    this.showResults = false;
    this.modalDlg = false;
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
    this.showResults = false;
    this.showReadingStrategies = false;

    var data = {
      'text': this.formData['text'],
      'language': this.formData['language'].value,
      'number_of_docs': parseInt(this.formData['number_of_docs'].value, 10),
      'w2v': this.formData['word2vec'].value,
      'test_documents' :  parseInt(this.formData['test_documents'].value, 10),
      'window_size' :  parseInt(this.formData['window_size'].value, 10),
      'test_search_corpus_offline' : this.formData['test_search_corpus_offline'].value,
      'test_precision_mode':false,
      'preposition' : this.formData['preposition'],
      'verbose' : this.formData['verbose'],
      'interjection' : this.formData['interjection'],
      'conjunction' : this.formData['conjunction'],
      'pronoun' : this.formData['pronoun'],
      'ner' : this.formData['ner']
    }
    this.apiRequestService.setEndpoint('semantic-diff');
    var process = this.apiRequestService.process(data);
    process.subscribe(response => {
      this.response = response;
      this.loading = false;

      if (response.success !== true) {
        alert('Server error occured!');
        return;
      }

      this.showReadingStrategies = true;
      this.dataResponse = response.data;
      
      var readerbenchService = this.readerbenchService;
      this.showResults = true;
    });
  }
 
  openDlg(){
    this.modalDlg = true;
  }
  modalButtonClose(){
    this.modalDlg = false;
  }
  modalButtonOK(){  
    this.showResultsModal = false;
    this.loadingModal = true;
    var data = {
      'modalText1': this.modalData['modalText1'],
      'modalText2': this.modalData['modalText2'],
      'w2v': this.formData['word2vec'].value,
      'preposition' : this.modalData['preposition'],
      'interjection' : this.modalData['interjection'],
      'verbose' : this.modalData['verbose'],
      'window_size' :  parseInt(this.modalData['window_size'].value, 10),
      'conjunction' : this.modalData['conjunction'],
      'pronoun' : this.modalData['pronoun'],
      'ner' : this.modalData['ner']
    }

    this.apiRequestService.setEndpoint('semantic-diff-test-diff-module');
    var process = this.apiRequestService.process(data);
    process.subscribe(response => {
      this.responseModal = response;
      this.loadingModal = false;
      
      if (response.success !== true) {
        alert('Server error occured!');
        return;
      }
      this.dataResponseModal = response.data;
      this.showResultsModal = true;
    });

  }

  toggleAdvancedModal() {
    this.advancedModal = !this.advancedModal;
  }
  precisionTestMode() {
    this.loading = true;
    this.showResults = false;
    this.showReadingStrategies = false;

    var data = {
    'text': this.formData['text'],
    'language': this.formData['language'].value,
    'number_of_docs': parseInt(this.formData['number_of_docs'].value, 10),
    'w2v': this.formData['word2vec'].value,
    'test_documents' :  parseInt(this.formData['test_documents'].value, 10),
    'window_size' :  parseInt(this.formData['window_size'].value, 10),
    'test_search_corpus_offline' : this.formData['test_search_corpus_offline'].value,
    'test_precision_mode':true,
    'preposition' : this.formData['preposition'],
    'verbose' : this.formData['verbose'],
    'interjection' : this.formData['interjection'],
    'conjunction' : this.formData['conjunction'],
    'pronoun' : this.formData['pronoun'],
    'ner' : this.formData['ner']
  }
  this.apiRequestService.setEndpoint('semantic-diff');
  var process = this.apiRequestService.process(data);
  process.subscribe(response => {
    this.response = response;
    this.loading = false;

    if (response.success !== true) {
      alert('Server error occured!');
      return;
    }

    this.showReadingStrategies = true;
    this.dataResponse = response.data;
    
    var readerbenchService = this.readerbenchService;
    this.showResults = true;
  });
  }
  processPutText2() {
      this.formData['text'] = SemDiffData.defaultText2;
  }
  processPutText3() {
      this.formData['text'] = SemDiffData.defaultText;
  }
}
