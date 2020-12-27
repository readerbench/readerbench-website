import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ApiRequestService } from '../api-request.service';
import { DefaultInputData } from '../demo.component.data';
import { CsclData } from './cscl.data';
import { isNil } from 'lodash';
import { TwoModeGraphService } from '../../../two-mode-graph.service';
import { ReaderBenchService } from '../../../readerbench.service';
import { DropzoneModule, DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { MatSliderChange } from '@angular/material/slider';
import * as d3 from 'd3';

@Component({
  selector: 'app-cscl',
  templateUrl: './cscl.component.html',
  styleUrls: ['./cscl.component.css'],
  providers: [ApiRequestService, TwoModeGraphService]
})
export class CsclComponent implements OnInit {

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

  private myColor = d3.scaleOrdinal().domain(['1', '25']).range(d3.schemeSet3);
  private nameToNode = {};

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
        case '#cna-graph':
          this.drawCnaGraph(this.response.data.cnaGraph);
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

  drawCnaGraph(cnaGraph = null) {
    if (cnaGraph == null) { return; }
    const treeDataCopy = cnaGraph.data;
    let nodesNumber = 0;
    treeDataCopy.children.forEach(utterance => {
      utterance.children.forEach(sentence => {
          nodesNumber++;
      });
    });
    const treeWidth = 10 * nodesNumber;
    const treeHeight = 20 * nodesNumber;
    const connections = treeDataCopy.edges;

    const svg = d3.select('.container-documents-analysis').append('svg')
      .attr('width', 4000).attr('height', 4000)
      .append('g').attr('transform', 'translate(0, 0)');

    const sliderValueArgument = 0.2;
    const sliderValueContent = 0.1;
    const sliderValueTopic = 0.2;
    const sliderValueSemantic = 0.8;
    this.displayDiagram(treeDataCopy, treeWidth, treeHeight, svg, connections, 
      sliderValueArgument, sliderValueContent, sliderValueTopic, sliderValueSemantic);
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

  formatConceptMapLabel(value: number) {
    if (value > 100) {
      return Math.round(value / 100) + '%';
    }

    return value + '%';
  }

  onChangeConceptMapSlider(conceptMapKey: string, event: MatSliderChange) {
    console.log('This is emitted as the thumb slides for concept map ' + conceptMapKey);
    console.log(event.value);
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
    if (this.noUploadedFiles === this.noFilesToUpload) {
      // console.log('File uploaded', args, response);
    }
  }

  private displayDiagram(treeData, treeWidth, treeHeight, svg, connections, sliderValueArgument,
    sliderValueContent, sliderValueTopic, sliderValueSemantic) {
    const _this = this,
      duration = 750;
    let i = 0,
      root;

    // console.log(treeHeight);
    // console.log(treeWidth);
    const treemap = d3.tree().size([treeHeight, treeWidth]);

    root = d3.hierarchy(treeData, function (d: any) { return d.children; });
    root.x0 = treeHeight / 2;
    root.y0 = 0;

    update(root, connections, sliderValueArgument, sliderValueContent, sliderValueTopic, sliderValueSemantic);

    function update(source, connections, sliderValueArgument, sliderValueContent, sliderValueTopic, sliderValueSemantic) {
      const treeData = treemap(root);

      const nodes = treeData.descendants(),
        links = treeData.descendants().slice(1);

      nodes.forEach(function (d) { d.y = d.depth * 180 });

      // ****************** Nodes section ***************************

      const node = svg.selectAll('g.node')
        .data(nodes, function (d: any) { return d.id || (d.id = ++i); });

      const nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr('transform', function (d) {
          return 'translate(' + source.x0 + ',' + source.y0 + ')';
        })
        .on('click', click);

      const valueNode = d3.select('body').append('div')
        .attr('class', 'tooltipValue')
        .attr('width', 100)
        .attr('height', 30);

      nodeEnter.append('circle')
        .attr('class', 'node')
        .attr('r', function (d: any) {
          return d.data.importance === 0 ? 2 : d.data.importance * 0.5;
        })
        .attr('id', function (d: any) { return d.data.name; })
        .style('fill', function (d: any) {
          if (d.data.type === 3) {
            const color = _this.myColor;
            d.data.color = color;
            return color;
          } else if (d.parent !== null && d.parent.data.type === 3) {
            return d.parent.data.color;
          } else {
            return '#fff';
          }
        })
        .on('mouseover', function (d: any) {
          valueNode.transition()
            .duration(200)
            .style('opacity', .9);
          valueNode.html(d.data.value)
            .style('left', (d3.event.pageX) - 210 + 'px')
            .style('top', (d3.event.pageY - 28) + 'px');

        })
        .on('mouseout', function (d) {
          if (d.data.type === 3) {
            const color = _this.myColor(d.id);
            d.data.color = color;
            return color;
          } else if (d.parent !== null && d.parent.data.type === 3) {
            return d.parent.data.color;
          } else {
            return '#fff';
          }
        });

      nodeEnter.append('text')
        .attr('dy', '1.35em')
        .attr('x', function (d: any) {
          return d.children || d._children ? -13 : -70;
        })
        .attr('text-anchor', function (d: any) {
          return d.children || d._children ? 'end' : 'start';
        })
        .text(function (d: any) { return d.data.name; })
        .style('font-weight', 'bold')
        .style('font-size', '14px');

      const nodeUpdate = nodeEnter.merge(<any>node);

      nodeUpdate.transition()
        .duration(duration)
        .attr('transform', function (d) {
          return 'translate(' + d.y + ',' + d.x + ')';
        });

      nodeUpdate.select('circle.node')
        .attr('r', function (d: any) {
          return d.data.importance === 0 ? 2 : d.data.importance * 0.5;
        })
        .style('fill', function (d: any) {
          if (d.data.type === 3) {
            const color = _this.myColor(d.id);
            d.data.color = color;
            return color;
          } else if (d.parent !== null && d.parent.data.type === 3) {
            return d.parent.data.color;
          } else {
            return '#fff';
          }
        })
        .attr('cursor', 'pointer');

      const nodeExit = node.exit().transition()
        .duration(duration)
        .attr('transform', function (d: any) {
          return 'translate(' + source.y + ',' + source.x + ')';
        })
        .remove();

      nodeExit.select('circle').attr('r', 1e-6);
      nodeExit.select('text').style('fill-opacity', 1e-6);

      const link = svg.selectAll('path.link').data(links, function (d: any) { return d.id; });

      const linkEnter = link.enter().insert('path', 'g').attr('class', 'link')
        .attr('d', function (d: any) {
          const o = { x: source.x0, y: source.y0 };
          return diagonal(o, o);
        });

      const linkUpdate = linkEnter.merge(<any>link);

      linkUpdate.transition()
        .duration(duration)
        .attr('d', function (d) { return diagonal(d, d.parent) });

      const linkExit = link.exit().transition()
        .duration(duration)
        .attr('d', function (d) {
          const o = { x: source.x, y: source.y };
          return diagonal(o, o);
        })
        .remove();

      nodes.forEach(function (d: any) {
        d.x0 = d.x;
        d.y0 = d.y;
      });

      nodes.forEach(function (n: any) {
        _this.nameToNode[n.data.name] = n;
      });

      const weightTooltip = d3.select('body').append('div').attr('class', 'tooltip').style('opacity', 0);

      _this.createEdges(svg, weightTooltip, connections, sliderValueContent, sliderValueTopic, sliderValueSemantic);

      function diagonal(s, d) {
        const path = `M ${s.y} ${s.x}
                C ${(s.y + d.y) / 2} ${s.x},
                  ${(s.y + d.y) / 2} ${d.x},
                  ${d.y} ${d.x}`;
        return path;
      }

      function click(d) {
        if (d.children) {
          d3.selectAll('.connection-CONTENT_OVERLAP').remove();
          d3.selectAll('.connection-TOPIC_OVERLAP').remove();
          d3.selectAll('.connection-SEMANTIC').remove();
          d3.selectAll('.connection-COREF').remove();
          d3.selectAll('.connection-MULTIPLE').remove();
          d._children = d.children;
          d.children = null;
        } else {
          d3.selectAll('.connection-CONTENT_OVERLAP').remove();
          d3.selectAll('.connection-TOPIC_OVERLAP').remove();
          d3.selectAll('.connection-SEMANTIC').remove();
          d3.selectAll('.connection-COREF').remove();
          d3.selectAll('.connection-MULTIPLE').remove();
          d.children = d._children;
          d._children = null;
        }

        update(d, connections, sliderValueArgument, sliderValueContent, sliderValueTopic, sliderValueSemantic);
      }
    }
  }

  private createEdges(svg, weightTooltip, edges, sliderValueContent, sliderValueTopic, sliderValueSemantic) {
    const thresholdMapping = new Map();
    thresholdMapping.set('LEXICAL_OVERLAP: CONTENT_OVERLAP', sliderValueContent);
    thresholdMapping.set('LEXICAL_OVERLAP: TOPIC_OVERLAP', sliderValueTopic);
    thresholdMapping.set('SEMANTIC: WORD2VEC(coca)', sliderValueSemantic);
    thresholdMapping.set('COREF', 0);

    const classMapping = new Map();
    classMapping.set('LEXICAL_OVERLAP: CONTENT_OVERLAP', 'CONTENT_OVERLAP');
    classMapping.set('LEXICAL_OVERLAP: TOPIC_OVERLAP', 'TOPIC_OVERLAP');
    classMapping.set('SEMANTIC: WORD2VEC(coca)', 'SEMANTIC');
    classMapping.set('COREF', 'COREF');

    edges.forEach(edge => {
      edge.types = edge.types.filter(function (type) {
        return type.weight === null || type.weight >= thresholdMapping.get(type.name);
      });
    });
    const _this = this;
    edges.forEach(function (arcLink) {
      let tooltipValue = '';
      if (arcLink.types.length > 0) {
        arcLink.types.forEach(element => {
          let details = '';
          if (element.details) {
            element.details.forEach(detail => {
              details += detail[0] + '<>' + detail[1] + ';';
            });
          }
          element.weight === null ? tooltipValue += element.name + '</br>' + details :
            tooltipValue += element.name + ': ' + parseFloat(element.weight).toFixed(3) + '</br>' + details;
        });

        if (arcLink.types.length > 1) {
          arcLink.color = 'connection-MULTIPLE';
        } else {
          arcLink.color = 'connection-' + classMapping.get(arcLink.types[0].name);
        }

        const path = d3.path();
        const xSource = _this.nameToNode[arcLink.source].y;
        const ySource = _this.nameToNode[arcLink.source].x;
        const xTarget = _this.nameToNode[arcLink.target].y;
        const yTarget = _this.nameToNode[arcLink.target].x;
        path.arc(xSource, (ySource + yTarget) / 2, (Math.abs(yTarget - ySource)) / 2, -0.5 * Math.PI, 0.5 * Math.PI, false);
        const pathString = path.toString();
        const pathId = arcLink.source + arcLink.target;

        svg.append('path')
            .attr('d', pathString)
            .attr('id', pathId)
            .attr('class', arcLink.color)
            .attr('fill', 'none')
            .on('mouseover', function (d) {
                d3.select(this).attr('class', 'pathMouseover');
                d3.selectAll('[id=\'' + arcLink.source + '\']').style('fill', 'red');
                d3.selectAll('[id=\'' + arcLink.target + '\']').style('fill', 'red');
                weightTooltip.transition()
                    .duration(200)
                    .style('opacity', .9);
                weightTooltip.html(arcLink.source + ' => ' + arcLink.target + '</br>' + tooltipValue)
                    .style('color', 'red')
                    .style('left', (d3.event.pageX) + 'px')
                    .style('top', (d3.event.pageY - 28) + 'px')
                    .style('vertical-align', 'middle');
            })
            .on('mouseout', function (d) {
                d3.select(this).attr('class', arcLink.color);
                d3.selectAll('[id=\'' + arcLink.source + '\']').style('fill', function(d: any) {
                    if (d.data.type === 3) {
                        const color = _this.myColor(d.id);
                        d.data.color = color;
                        return color;
                    } else if (d.parent !== null && d.parent.data.type === 3) {
                        return d.parent.data.color;
                    } else {
                        return '#fff';
                    }
                })
                d3.selectAll('[id=\'' + arcLink.target + '\']').style('fill', function(d: any) {
                    if (d.data.type === 3) {
                        const color = _this.myColor(d.id);
                        d.data.color = color;
                        return color;
                    } else if (d.parent !== null && d.parent.data.type === 3) {
                        return d.parent.data.color;
                    } else {
                        return '#fff';
                    }
                });
                weightTooltip.transition()
                    .duration(500)
                    .style('opacity', 0);
            });
      }
    });
  }

}
