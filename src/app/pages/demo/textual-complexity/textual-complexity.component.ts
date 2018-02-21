import { Component, OnInit, Input } from '@angular/core';
import { DemoMenuComponent } from '../sections/menu/menu.component';
import { DefaultInputData } from '../demo.component.data';
import { ApiRequestService } from '../api-request.service';
import { DemoComponent } from '../demo.component';
import { ReaderbenchService } from '../../../readerbench.service';

@Component({
  selector: 'app-demo-textual-complexity',
  templateUrl: './textual-complexity.component.html',
  styleUrls: ['./textual-complexity.component.css'],
  providers: [ApiRequestService, ReaderbenchService]
})

export class TextualComplexityComponent implements OnInit {

  formData = {};
  advanced: boolean;
  loading: boolean;
  showResults: boolean;

  response: any;

  constructor(private apiRequestService: ApiRequestService, private readerbenchService: ReaderbenchService) {
    this.apiRequestService.setEndpoint('textual-complexity');
  }

  ngOnInit() {

    this.formData = {
      'text': DefaultInputData.text,
      'language': DefaultInputData.defaultLanguage(),
      'lsa': DefaultInputData.defaultMetricOptions.lsa.EN(),
      'lda': DefaultInputData.defaultMetricOptions.lda.EN(),
      'word2vec': DefaultInputData.defaultMetricOptions.word2vec.EN(),
      'pos-tagging': DefaultInputData.defaultPosTaggingOption(),
      'dialogism': DefaultInputData.defaultDialogismOption(),
    };
    this.advanced = false;
    this.loading = false;
    this.showResults = false;

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

      var aux = response.data.complexityIndices;
      var readerbenchService = this.readerbenchService;
      var interval = setInterval(function () {
        if (aux.count === response.data.complexityIndices.count) {
          clearInterval(interval);
          readerbenchService.courseDescriptionToggle();
        }
      }, 1000);


      this.showResults = true;

    });
  }

}
