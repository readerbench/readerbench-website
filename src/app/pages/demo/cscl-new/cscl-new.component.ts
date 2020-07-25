import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ApiRequestService } from '../api-request.service';
import { DefaultInputData } from '../demo.component.data';
import { CsclData } from './cscl-new.data';
import { isNil } from 'lodash';
import { TwoModeGraphService } from '../../../two-mode-graph.service';
import { ReaderBenchService } from '../../../readerbench.service';
import { DropzoneModule, DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

@Component({
  selector: 'app-cscl',
  templateUrl: './cscl-new.component.html',
  styleUrls: ['./cscl-new.component.css'],
  providers: [ApiRequestService, TwoModeGraphService]
})
export class CsclNewComponent implements OnInit {

  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 0,
    timeout: 60 * 1000,
  };

  formData: any;
  @Input() advanced: boolean;
  loading: boolean;
  showResults: boolean;
  languages: any;
  language: any;

  response: any;
  errors: any;
  warnings: any;
  isFileUploaded: boolean;
  uploadedFileName: string;
  topics: any;
  topicEdges: any;
  participants: any;
  participantEdges: any;
  participantEvolution: any;
  collaborationSocialKBNodes: any;
  // voiceOverlapNodes: any;
  csclIndices: any;
  csclIndicesDescriptions: any;
  conceptMaps: any;
  conceptGraphs: any;
  error: string;

  participantInteractionGraph: any;

  noFilesToUpload: number;
  noUploadedFiles: number;

  @ViewChild(DropzoneModule, {}) componentRef?: DropzoneModule;
  @ViewChild(DropzoneDirective, {}) directiveRef?: DropzoneDirective;

  constructor(
    private apiRequestService: ApiRequestService,
    private twoModeGraphService: TwoModeGraphService,
    private readerbenchService: ReaderBenchService
  ) {
  }

  ngOnInit() {
    this.isFileUploaded = false;
    this.languages = CsclData.languages;
    this.language = CsclData.defaultLanguage;

    this.formData = {
      'language': this.language,
      'pos-tagging': DefaultInputData.defaultPosTaggingOption(),
      'dialogism': DefaultInputData.defaultDialogismOption(),
      'threshold': DefaultInputData.semanticSimilarityThreshold
    };
    this.loadSemanticModels();

    this.loading = false;
    this.showResults = false;

    this.noFilesToUpload = 0;
    this.noUploadedFiles = 0;
    this.conceptMaps = {
      'LSA': null,
      'LDA': null,
      'WORD2VEC': null
    };
    this.conceptGraphs = {
      'LSA': null,
      'LDA': null,
      'WORD2VEC': null
    };
  }

  switchTo(zoneSelector = '') {
    jQuery('.response-zone').hide();
    console.log('activating ' + zoneSelector);
    if (zoneSelector) {
      jQuery(zoneSelector).show();
      switch (zoneSelector) {
        case '#participant-interaction':
          this.drawParticipantInteractionGraph(this.response.data.participantInteractionGraph);
          break;
        case '#concept-graph-LSA':
          this.drawConceptGraph(this.response.data.conceptMaps.LSA, 'LSA');
          break;
        case '#concept-graph-LDA':
          this.drawConceptGraph(this.response.data.conceptMaps.LDA, 'LDA');
          break;
        case '#concept-graph-WORD2VEC':
          this.drawConceptGraph(this.response.data.conceptMaps.WORD2VEC, 'WORD2VEC');
          break;
      }
    }
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

  drawConceptGraph(conceptMapData = null, key = null) {
    if (conceptMapData == null || key == null) { return; }
    console.log('drawing concept map ' + key, conceptMapData);
    const conceptGraph = {
      nodeList: conceptMapData.nodeList,
      edgeList: conceptMapData.edgeList,
    };

    this.twoModeGraphService.getGraph(conceptGraph).subscribe(
      graph => { this.conceptGraphs[key] = graph; },
      error => { this.error = error.message; },
      () => {
      }
    );
  }

  drawParticipantInteractionGraph(participantInteractionData = null) {
    if (participantInteractionData == null) { return; }
    const participantInteractionObj = {
      'nodeList': participantInteractionData.nodeList,
      'edgeList': participantInteractionData.edgeList
    };
    this.twoModeGraphService.getGraph(participantInteractionObj).subscribe(
      graph => { this.participantInteractionGraph = graph; },
      error => { this.error = error.message; },
      () => { }
    );
  }

  process() {
    this.apiRequestService.setApiService(CsclData.serviceName);
    this.apiRequestService.setHeaders(this.apiRequestService.HEADERS_TYPE_COMMON_REQUEST);
    this.loading = true;
    this.showResults = false;

    const data = {
      'cscl-file': this.uploadedFileName,
      'language': this.formData['language'].value,
      'lsa': this.formData['lsa'].value,
      'lda': this.formData['lda'].value,
      'w2v': this.formData['word2vec'].value,
      'pos-tagging': this.formData['pos-tagging'],
      'dialogism': this.formData['dialogism'],
      'threshold': this.formData['threshold']
    };

    const process = this.apiRequestService.process(data);
    process.subscribe(response => {
      const _this = this;
      this.response = response;
      this.loading = false;

      if (response.success !== true) {
        if (!isNil(response.errorMsg)) {
          alert(response.errorMsg);
        } else {
          alert('Server error occured!');
        }
        return;
      }

      this.showResults = true;

      // build participant evolution graph
      this.participantEvolution = response.data.participantEvolution;
      const intervalParticipantEvolution = setInterval(function () {
        if (_this.participantEvolution.count === response.data.participantEvolution.count) {
          clearInterval(intervalParticipantEvolution);
          _this.readerbenchService.d3jsMultipleLinesGraph(
            response.data.participantEvolution,
            '#participantEvolution',
            'Contribution ID',
            'value');
        }
      }, 1000);

      // build collaboration kb graph
      this.collaborationSocialKBNodes = response.data.socialKB;
      const intervalCollaborationSocialKB = setInterval(function () {
        if (_this.collaborationSocialKBNodes.count === response.data.socialKB.count) {
          clearInterval(intervalCollaborationSocialKB);
          _this.readerbenchService.d3jsLineGraph(
            response.data.socialKB,
            '#collaborationSocialKB',
            'Contribution ID',
            'Social KB value'
          );
        }
      }, 1000);

      // build collaboration voice graph
      // this.voiceOverlapNodes = response.data.voiceOverlap;
      // const intervalCollaborationVoiceOverlap = setInterval(function () {
      //   if (_this.voiceOverlapNodes.count === response.data.voiceOverlap.count) {
      //     clearInterval(intervalCollaborationVoiceOverlap);
      //     _this.readerbenchService.d3jsLineGraph(
      //       response.data.voiceOverlap,
      //       '#collaborationVoiceOverlap',
      //       'Contribution ID',
      //       'Voice PMI'
      //     );
      //   }
      // }, 1000);

      // build cscl indices
      this.csclIndices = response.data.csclIndices;
      const intervalCsclIndices = setInterval(function () {
        if (_this.csclIndices.count === response.data.csclIndices.count) {
          clearInterval(intervalCsclIndices);
        }
      }, 1000);

      // build cscl indices description
      this.csclIndicesDescriptions = response.data.csclIndicesDescriptions;
      const csclIndicesDescriptions = setInterval(function () {
        if (_this.csclIndicesDescriptions.count === response.data.csclIndicesDescriptions.count) {
          clearInterval(csclIndicesDescriptions);
        }
      }, 1000);

    });
  }

  fileChange(event) {
    this.apiRequestService.setApiService(CsclData.fileUploadEndpointKey);
    this.apiRequestService.setHeaders(this.apiRequestService.HEADERS_TYPE_FILE_UPLOAD);
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
      const process = this.apiRequestService.process(formData);
      process.subscribe(response => {
        if (!isNil(response.data.errors)) {
          this.errors = response.data.errors;
        }
        if (!isNil(response.data.warnings)) {
          this.warnings = response.data.warnings;
        }
        this.uploadedFileName = response.data.name;
        this.isFileUploaded = true;
        // jQuery('#submit-button').prop('disabled', false);
      });
    }
  }

  public onUploadInit(args: any): void {
  }

  public onSending(args: any): void {
    this.noFilesToUpload++;
  }

  public onUploadError(args: any): void {
    alert('There was an error uploading your file(s)!');
  }

  public onUploadSuccess(args: any): void {
    // console.log(args);
    this.uploadedFileName = args[1].data.file;
  }

  public onUploadComplete(args: any, response): void {
    this.noUploadedFiles++;
    if (this.noUploadedFiles == this.noFilesToUpload) {
      console.log('File uploaded', args, response);
      // this.uploadedFileName = args.data.name;
    }
  }

}
