import { Component, OnInit, Input } from '@angular/core';
import { DefaultInputData } from '../demo.component.data';
import { ApiRequestService } from '../api-request.service';
import { ReaderbenchService } from '../../../readerbench.service';
import { TwoModeGraphService } from '../../../two-mode-graph.service';
import { DemoCommonFieldsComponent } from '../sections/common-fields/common-fields.component';
import { Language } from '../languages.data';

@Component({
  selector: 'app-keywords',
  templateUrl: './keywords.component.html',
  styleUrls: ['./keywords.component.css'],
  providers: [ApiRequestService, ReaderbenchService, TwoModeGraphService]
})
export class KeywordsComponent implements OnInit {

  formData = {};
  @Input() advanced: boolean;
  loading: boolean;
  showResults: boolean;
  language: Language;

  response: any;

  myGraph: any;
  error: string;

  value: any;

  constructor(private apiRequestService: ApiRequestService, private readerbenchService: ReaderbenchService, private twoModeGraphService: TwoModeGraphService) {
    this.apiRequestService.setEndpoint('keywords');
  }

  ngOnInit() {
    this.language = Language.English;

    this.formData = {
      'text': DefaultInputData.text,
      'language': DefaultInputData.defaultLanguage(),
      'lsa': DefaultInputData.defaultMetricOptions.lsa.English(),
      'lda': DefaultInputData.defaultMetricOptions.lda.English(),
      'word2vec': DefaultInputData.defaultMetricOptions.word2vec.English(),
      'pos-tagging': DefaultInputData.defaultPosTaggingOption(),
      'dialogism': DefaultInputData.defaultDialogismOption(),
      'threshold': DefaultInputData.semanticSimilarityThreshold,
      'bigrams': DefaultInputData.defaultBigrams
    };
    
    this.loading = false;
    this.showResults = false;

  }

  advancedEmitter($event) {
    this.advanced = $event;
  }

  languageEmitter($event) {
    this.language = $event;
    this.formData['lsa'] = DefaultInputData.defaultMetricOptions.lsa[this.language]();
    this.formData['lda'] = DefaultInputData.defaultMetricOptions.lda[this.language]();
    this.formData['word2vec'] = DefaultInputData.defaultMetricOptions.word2vec[this.language]();
  }

  process() {
    this.loading = true;
    this.showResults = false;

    var data = {
      'text': this.formData['text'],
      'language': this.formData['language'].value,
      'lsa': this.formData['lsa'].value,
      'lda': this.formData['lda'].value,
      'w2v': this.formData['word2vec'].value,
      'pos-tagging': this.formData['pos-tagging'],
      'dialogism': this.formData['dialogism'],
      'threshold': this.formData['threshold'],
      'bigrams': this.formData['bigrams']
    }

    var process = this.apiRequestService.process(data);
    process.subscribe(response => {
      this.response = response;
      this.loading = false;

      if (response.success !== true) {
        alert('Server error occured!');
        return;
      }

      this.myGraph = {
        'nodeList': response.data.nodeList,
        'edgeList': response.data.edgeList
      };

      this.twoModeGraphService.getGraph(this.myGraph).subscribe(
        graph => { this.myGraph = graph; },
        error => { this.error = error.message; },
        () => {
          
          // this.readerbenchService.d3jsForTopics(this.graph, "#conceptMap", false);
        }
      );

      this.showResults = true;

    });
  }

}
