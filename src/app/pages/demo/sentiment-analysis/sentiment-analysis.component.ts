import { Component, OnInit } from '@angular/core';
import { DemoMenuComponent } from '../sections/menu/menu.component';
import { SentimentAnalysisData } from './sentiment-analysis.data';
import { DefaultInputData } from '../demo.component.data';
import { ApiRequestService } from '../api-request.service';
import { DemoCommonFieldsComponent } from '../sections/common-fields/common-fields.component';

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

  formData = {};
  advanced: boolean;
  loading: boolean;
  showResults: boolean;

  granularities: any;

  response: any;

  sentimentColorsHex: any = {
    'scared'  : '#fbfd00',
    'angry'   : '#f30707',
    'sad'     : '#6cb3fb',
    'happy'   : '#38b616',
    'excited' : '#fdb900',
    'tender'  : '#fba7f4'
  };

  sentimentColors: any = {
    'scared'  : this.hexToRgb('#fbfd00'),
    'angry'   : this.hexToRgb('#f30707'),
    'sad'     : this.hexToRgb('#6cb3fb'),
    'happy'   : this.hexToRgb('#38b616'),
    'excited' : this.hexToRgb('#fdb900'),
    'tender'  : this.hexToRgb('#fba7f4')
  };

  constructor(private apiRequestService: ApiRequestService) {
    this.apiRequestService.setEndpoint('sentiment-analysis');
  }

  ngOnInit() {
    this.granularities = SentimentAnalysisData.granularities;

    this.formData = {
      'text': DefaultInputData.text,
      'language': DefaultInputData.defaultLanguage(),
      'lsa': DefaultInputData.defaultMetricOptions.lsa.EN(),
      'lda': DefaultInputData.defaultMetricOptions.lda.EN(),
      'word2vec': DefaultInputData.defaultMetricOptions.word2vec.EN(),
      'pos-tagging': DefaultInputData.defaultPosTaggingOption(),
      'dialogism': DefaultInputData.defaultDialogismOption(),
      'granularity': SentimentAnalysisData.defaultGranularity(),
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
      // var sentiments;
      // var interval = setInterval(function () {
      //   if (sentiments.count === response.data[0].valences.length) {
      //     clearInterval(interval);
      //     this.animateProgressBar(jQuery('.results-sentiment div.progress-bar'));
      //     jQuery('.results-sentiment a').each(function () {
      //       jQuery(this)
      //         .attr('title', jQuery(this).parent().find(" > .tooltip-content").html())
      //         .tooltip('fixTitle').tooltip('show');              
      //     });
      //     jQuery('.results-sentiment a').tooltip('hide');
      //     for (var i = 0; i < response.data.data.length; i++) {
      //       var rgb = computeColors(response.data.data[i], 0.1);
      //       var hex = rgbToHex(rgb.r, rgb.g, rgb.b);
      //       jQuery('.results-sentiment #text-' + i + ' span.body').css('background-color', hex);
      //     }
      //   }
      // }, 1000);

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
    //for (var valence in element.valences)
    console.log(valences);
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

    console.log(sumSentiments);
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

  log(x) {
    console.log(x);
    return x;
  }

}
