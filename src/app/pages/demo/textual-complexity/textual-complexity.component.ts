import { Component, OnInit, Input } from '@angular/core';
import { DemoMenuComponent } from '../sections/menu/menu.component';
import { DefaultInputData } from '../demo.component.data';
import { ApiRequestService } from '../api-request.service';
import { DemoComponent } from '../demo.component';
import { ReaderBenchService } from '../../../readerbench.service';
import { TextualComplexityData } from './textual-complexity.data';
import { Language } from '../languages.data';

@Component({
  selector: 'app-demo-textual-complexity',
  templateUrl: './textual-complexity.component.html',
  styleUrls: ['./textual-complexity.component.css'],
  providers: [ApiRequestService, ReaderBenchService]
})

export class TextualComplexityComponent implements OnInit {

  componentTitle: string;
  formData: any;
  @Input() advanced: boolean;
  loading: boolean;
  showResults: boolean;
  languages: any;
  language: any;

  response: any;

  constructor(private apiRequestService: ApiRequestService, private readerbenchService: ReaderBenchService) {
    this.apiRequestService.setApiService(TextualComplexityData.serviceName);
  }

  ngOnInit() {
    this.componentTitle = TextualComplexityData.componentTitle;
    this.languages = TextualComplexityData.languages;
    this.language = TextualComplexityData.defaultLanguage;

    this.formData = {
      'text': DefaultInputData.text,
      'language': DefaultInputData.defaultLanguage(),
      'pos-tagging': DefaultInputData.defaultPosTaggingOption(),
      'dialogism': DefaultInputData.defaultDialogismOption(),
    };
    this.loadSemanticModels();

    this.advanced = false;
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

      const aux = response.data.complexityIndices;
      const readerbenchService = this.readerbenchService;
      const interval = setInterval(function () {
        if (aux.count === response.data.complexityIndices.count) {
          clearInterval(interval);
          readerbenchService.courseDescriptionToggle();
        }
      }, 1000);

      this.showResults = true;
    });
  }

}
