import { Component, NgModule, OnInit, Input } from '@angular/core';
import { ApiRequestService } from '../api-request.service';
import { ReaderBenchService } from '../../../readerbench.service';
import { TwoModeGraphService } from '../../../two-mode-graph.service';
import { CvAnalysisData } from './cv-analysis.data';
import { DefaultInputData } from '../demo.component.data';

@Component({
  selector: 'app-cv-analysis',
  templateUrl: './cv-analysis.component.html',
  styleUrls: ['./cv-analysis.component.css'],
  providers: [ApiRequestService, ReaderBenchService, TwoModeGraphService]
})
export class CvAnalysisComponent implements OnInit {

  componentTitle: string;
  formData = {};

  @Input() advanced: boolean;
  loading: boolean;
  fileUploading: boolean = false;
  fileUploaded: boolean = false;
  showResults: boolean;
  languages: any;
  language: any;
  cvFile: string | any = null;

  response: any;
  errors: any;
  warnings: any;
  myGraph: any;
  error: any;
  socialNetworksLinksFoundKeys: any;
  text: string;
  processedText: string;
  liwcEmotionsKeys: any;
  
  constructor(private apiRequestService: ApiRequestService, private readerbenchService: ReaderBenchService, private twoModeGraphService: TwoModeGraphService) {
  }

  ngOnInit() {
    this.componentTitle = CvAnalysisData.componentTitle;
    this.languages = CvAnalysisData.languages;
    this.language = CvAnalysisData.defaultLanguage;

    this.formData = {
      'keywords': CvAnalysisData.keywords,
      'ignore': CvAnalysisData.ignore,
      'language': this.language,
      'pos-tagging': DefaultInputData.defaultPosTaggingOption(),
      'dialogism': DefaultInputData.defaultDialogismOption(),
      'threshold': DefaultInputData.semanticSimilarityThreshold
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

  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        // reader.result.split(',')[1]
        this.fileUploading = true;
        this.uploadFile(file);
      };
    }
  }

  uploadFile(file) {
    this.apiRequestService.setHeaders(this.apiRequestService.HEADERS_TYPE_FILE_UPLOAD);
    this.apiRequestService.setCommonService(CvAnalysisData.uploadService);

    var process = this.apiRequestService.upload(file);
    process.subscribe(response => {
      this.response = response;
      this.loading = false;

      if (response.success !== true) {
        alert('Server error occured!');
        return;
      }

      this.fileUploading = false;
      this.fileUploaded = true;
      this.formData['cv-file'] = this.cvFile = response.data.name;
    });
  }

  process() {
    if (!this.cvFile) {
      alert("Upload one CV file first!");
      return;
    }

    this.apiRequestService.setHeaders(this.apiRequestService.HEADERS_TYPE_COMMON_REQUEST);
    this.apiRequestService.setApiService(CvAnalysisData.serviceName);
    this.loading = true;
    this.showResults = false;

    var data = {
      'cv-file': this.formData['cv-file'],
      'keywords': this.formData['keywords'],
      'ignore': this.formData['ignore'],
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
      if (response.data.errors.length > 0) this.errors = response.data.errors;
      if (response.data.warnings.length > 0) this.warnings = response.data.warnings;

      this.socialNetworksLinksFoundKeys = this.readerbenchService.objectKeys(response.data.socialNetworksLinksFound);
      console.log(this.socialNetworksLinksFoundKeys);

      if (typeof response.data.text !== 'undefined')
        this.text = '<p>' + response.data.text.replace(/\n/g, "</p><p>") + '</p>';
      if (typeof response.data.processedText !== 'undefined')
        this.processedText = '<p>' + response.data.processedText.replace(/\n/g, "</p><p>") + '</p>';

      this.myGraph = {
        'nodeList': response.data.graph.nodeList,
        'edgeList': response.data.graph.edgeList
      };
      this.twoModeGraphService.getGraph(this.myGraph).subscribe(
        graph => { this.myGraph = graph; },
        error => { this.error = error.message; },
        () => {
        }
      );

      var readerbenchService = this.readerbenchService;
      var aux = response.data.textualComplexity;
      var interval = setInterval(function () {
        if (aux.count === response.data.textualComplexity.count) {
          clearInterval(interval);
          readerbenchService.courseDescriptionToggle('#textual-complexity');
        }
      }, 1000);
      aux = response.data.liwcEmotions;
      interval = setInterval(function () {
        if (aux.count === response.data.liwcEmotions.count) {
          clearInterval(interval);
          readerbenchService.courseDescriptionToggle('#liwc-sentiments');
        }
      }, 1000);
      this.liwcEmotionsKeys = this.readerbenchService.objectKeys(response.data.liwcEmotions);
      console.log(this.liwcEmotionsKeys);
    });
  }

}
