import { Component, OnInit, Input } from '@angular/core';
import { DemoMenuComponent } from '../sections/menu/menu.component';
import { SentimentAnalysisData } from './sentiment-analysis.data';
import { DefaultInputData } from '../demo.component.data';
import { ApiRequestService } from '../api-request.service';
import { DemoCommonFieldsComponent } from '../sections/common-fields/common-fields.component';
import { Language } from '../languages.data';

interface Granularity {
  id: string,
  name: string,
  value: number
}

@Component({
  selector: 'app-demo-sentiment-analysis',
  templateUrl: './sentiment-analysis.component.html',
  styleUrls: ['./sentiment-analysis.component.css'],
  providers: [ApiRequestService]
})

export class SentimentAnalysisComponent implements OnInit {

  componentTitle: string;
  formData = {};
  @Input() advanced: boolean;
  loading: boolean;
  showResults: boolean;
  languages: any;
  language: any;
  granularities: any;
  response: any;
  sentimentColorsHex: any;
  sentimentColors: any;

  constructor(private apiRequestService: ApiRequestService) {
    this.apiRequestService.setEndpoint('sentiment-analysis');
  }

  ngOnInit() {
    this.componentTitle = SentimentAnalysisData.componentTitle;
    this.initSentimentColors();
    this.languages = SentimentAnalysisData.languages;
    this.language = SentimentAnalysisData.defaultLanguage;
    this.granularities = SentimentAnalysisData.granularities;

    this.formData = {
      'text': DefaultInputData.text,
      'language': this.language,
      'pos-tagging': DefaultInputData.defaultPosTaggingOption(),
      'dialogism': DefaultInputData.defaultDialogismOption(),
      'granularity': SentimentAnalysisData.defaultGranularity(),
    };
    this.loadSemanticModels();

    this.advanced = false;
    this.loading = false;
    this.showResults = false;
  }

  loadSemanticModels() {
    var languageValue = this.language.value;
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

  initSentimentColors() {
    this.sentimentColorsHex = {
      'scared'  : '#fbfd00',
      'angry'   : '#f30707',
      'sad'     : '#6cb3fb',
      'happy'   : '#38b616',
      'excited' : '#fdb900',
      'tender'  : '#fba7f4'
    };

    this.sentimentColors = {
      'scared'  : this.hexToRgb(this.sentimentColorsHex['scared']),
      'angry'   : this.hexToRgb(this.sentimentColorsHex['angry']),
      'sad'     : this.hexToRgb(this.sentimentColorsHex['sad']),
      'happy'   : this.hexToRgb(this.sentimentColorsHex['happy']),
      'excited' : this.hexToRgb(this.sentimentColorsHex['excited']),
      'tender'  : this.hexToRgb(this.sentimentColorsHex['tender'])
    };
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
      'granularity': this.formData['granularity'].value,
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

  animateProgressBar(element) {
    element.show();
    jQuery(element).width(0);
    jQuery(element).width(
      function () {
        return jQuery(this).attr("aria-valuenow") + "%";
      }
    );
  }

  getSentimentColor(sentiment) {
    return this.sentimentColorsHex[sentiment];
  }

  computeColors(valences, threshold) {

    var sumSentiments = {
      r: 0,
      g: 0,
      b: 0
    };

    var sumPercentage = 0;
    if (typeof valences !== 'undefined') {
      for (var i = 0; i < valences.length; i++) {
        var valence = valences[i];
        if (valence.score >= threshold) {
          sumSentiments.r += valence.score * this.sentimentColors[valence.valence].r;
          sumSentiments.g += valence.score * this.sentimentColors[valence.valence].g;
          sumSentiments.b += valence.score * this.sentimentColors[valence.valence].b;
          sumPercentage += valence.score;
        }
      }

      sumSentiments.r = Math.round(sumSentiments.r / sumPercentage);
      sumSentiments.g = Math.round(sumSentiments.g / sumPercentage);
      sumSentiments.b = Math.round(sumSentiments.b / sumPercentage);
    }
    else {
      sumSentiments.r = 0;
      sumSentiments.g = 0;
      sumSentiments.b = 0;
    }

    return sumSentiments;
  }

  rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
      return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

}
