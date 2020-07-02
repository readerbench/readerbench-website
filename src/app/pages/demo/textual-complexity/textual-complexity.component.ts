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
  displayedText: string;

  response: any;

  constructor(private apiRequestService: ApiRequestService, private readerbenchService: ReaderBenchService) {
    this.apiRequestService.setApiService(TextualComplexityData.serviceName);
  }

  ngOnInit() {
    this.componentTitle = TextualComplexityData.componentTitle;
    this.languages = TextualComplexityData.languages;
    this.language = TextualComplexityData.defaultLanguage;
    this.displayedText = 'Selected text will be displayed in here.';

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

  documentToStr(encapsulatorDepth = 1, decoratorTag = 'div', encapsulatorTag = 'ul') {
    let sb = '';
    sb += '<' + decoratorTag + '>';
    sb += '<b>Document:</b> ';
    sb += '<' + encapsulatorTag + ' class="level' + encapsulatorDepth + '">';
    if (this.response.data.texts.length > 0) {
      this.response.data.texts.forEach((paragraph, pIndex) => {
        sb += this.paragraphToStr(pIndex, encapsulatorDepth + 1);
      });
    }
    sb += '</' + encapsulatorTag + '>';
    sb += '</' + decoratorTag + '>';
    return sb;
  }

  paragraphToStr(paragraph_index = -1, encapsulatorDepth = 2, decoratorTag = 'li', encapsulatorTag = 'ul') {
    if (paragraph_index === -1) {
      return null;
    }
    let sb = '';
    sb += '<' + decoratorTag + '>';
    sb += '<b>Paragraph ' + paragraph_index + ':</b> ';
    sb += '<' + encapsulatorTag + ' class="level' + encapsulatorDepth + '">';
    if (this.response.data.texts[paragraph_index].length > 0) {
      this.response.data.texts[paragraph_index].forEach((sentence, sIndex) => {
        sb += this.sentenceToStr(paragraph_index, sIndex);
      });
    }
    sb += '</' + encapsulatorTag + '>';
    sb += '</' + decoratorTag + '>';
    return sb;
  }

  sentenceToStr(paragraph_index = -1, sentence_index = -1, decoratorTag = 'li') {
    if (paragraph_index === -1 || sentence_index === -1) {
      return null;
    }
    let sb = '';
    sb += '<' + decoratorTag + '>';
    sb += '<b>Sentence ' + paragraph_index + '.' + sentence_index + '</b>: ';
    sb += this.response.data.texts[paragraph_index][sentence_index];
    sb += '</' + decoratorTag + '>';
    return sb;
  }

  textToStr(paragraph_index = -1, sentence_index = -1) {
    let sb = '';
    if (sentence_index === -1) {
      if (paragraph_index === -1) { // document level
        sb += this.documentToStr();
      } else { // pararaph level
        sb += this.paragraphToStr(paragraph_index, 1, 'div');
      }
    } else { // sentence level
      if (paragraph_index === -1) { // impossible
        return null;
      } else {
        sb += this.sentenceToStr(paragraph_index, sentence_index, 'div');
      }
    }
    return sb;
  }

  showText(paragraph_index = -1, sentence_index = -1) {
    const sb = this.textToStr(paragraph_index, sentence_index);
    jQuery('.displayed-text').html(sb);
    jQuery('html, body').animate({
      scrollTop: $('.displayed-text').offset().top - 70
    }, 1000);
  }

}
