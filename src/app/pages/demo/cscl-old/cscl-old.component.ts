import { Component, OnInit, Input } from '@angular/core';
import { ApiRequestService } from '../api-request.service';
import { DefaultInputData } from '../demo.component.data';
import { CsclOldData } from './cscl-old.data';
import { isNil } from 'lodash';
import { TwoModeGraphService } from '../../../two-mode-graph.service';
import { ReaderBenchService } from '../../../readerbench.service';
@Component({
  selector: 'app-old-cscl',
  templateUrl: './cscl-old.component.html',
  styleUrls: ['./cscl-old.component.css'],
  providers: [ApiRequestService, TwoModeGraphService]
})
export class CsclOldComponent implements OnInit {

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
  voiceOverlapNodes: any;
  csclIndices: any;
  csclIndicesDescription: any;
  conceptMap: any;
  error: string;

  participantInteractionGraph: any;

  constructor(
    private apiRequestService: ApiRequestService,
    private twoModeGraphService: TwoModeGraphService,
    private readerbenchService: ReaderBenchService
  ) {
  }

  ngOnInit() {
    this.isFileUploaded = false;
    this.languages = CsclOldData.languages;
    this.language = CsclOldData.defaultLanguage;

    this.formData = {
      'language': this.language,
      'pos-tagging': DefaultInputData.defaultPosTaggingOption(),
      'dialogism': DefaultInputData.defaultDialogismOption(),
      'threshold': DefaultInputData.semanticSimilarityThreshold
    };
    this.loadSemanticModels();

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
    this.apiRequestService.setApiService(CsclOldData.serviceName);
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
        if (!isNil(response.data.errorMsg)) {
          alert(response.data.errorMsg);
        } else {
          alert('Server error occured!');
        }
        return;
      }

      this.showResults = true;
      // build concept map
      this.topics = response.data.conceptMap.nodeList;
      const conceptGraph = {
        nodeList: response.data.conceptMap.nodeList,
        edgeList: response.data.conceptMap.edgeList,
      };

      this.twoModeGraphService.getGraph(conceptGraph).subscribe(
        graph => { this.conceptMap = graph; },
        error => { this.error = error.message; },
        () => {
        }
      );

      // participant interaction graph
      // this.participantInteractionGraph = {
      //   'nodeList': response.data.participantInteractionGraph.nodeList,
      //   'edgeList': response.data.participantInteractionGraph.edgeList
      // };

      // this.twoModeGraphService.getGraph(this.participantInteractionGraph).subscribe(
      //   graph => { this.participantInteractionGraph = graph; },
      //   error => { this.error = error.message; },
      //   () => { }
      // );

      this.participants = response.data.participantInteractionGraph.nodeList;
      this.participantEdges = response.data.participantInteractionGraph.edgeList;
      const intervalParticipantInteraction = setInterval(function () {
        if (_this.participantEdges.count === response.data.participantInteractionGraph.edgeList.count) {
          clearInterval(intervalParticipantInteraction);
          const participantInteractionGraph = {
            'nodes': response.data.participantInteractionGraph.nodeList,
            'links': response.data.participantInteractionGraph.edgeList
          };
          _this.readerbenchService.d3jsForTopics(
            participantInteractionGraph,
            '#participantInteractionMap',
            false
          );
        }
      }, 1000);

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
      this.voiceOverlapNodes = response.data.voiceOverlap;
      const intervalCollaborationVoiceOverlap = setInterval(function () {
        if (_this.voiceOverlapNodes.count === response.data.voiceOverlap.count) {
          clearInterval(intervalCollaborationVoiceOverlap);
          _this.readerbenchService.d3jsLineGraph(
            response.data.voiceOverlap,
            '#collaborationVoiceOverlap',
            'Contribution ID',
            'Voice PMI'
          );
        }
      }, 1000);

      // build cscl indices
      this.csclIndices = response.data.csclIndices;
      const intervalCsclIndices = setInterval(function () {
        if (_this.csclIndices.count === response.data.csclIndices.count) {
          clearInterval(intervalCsclIndices);
        }
      }, 1000);

      // build cscl indices description
      this.csclIndicesDescription = response.data.csclIndicesDescription;
      const intervalCsclIndicesDescription = setInterval(function () {
        if (_this.csclIndicesDescription.count === response.data.csclIndicesDescription.count) {
          clearInterval(intervalCsclIndicesDescription);
        }
      }, 1000);

    });
  }

  fileChange(event) {
    this.apiRequestService.setApiService(CsclOldData.fileUploadEndpointKey);
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

}
