import { ApiRequestService } from "../../api-request.service";
import { OnInit, Component, Input, OnChanges } from "@angular/core";
import * as d3 from 'd3';

interface Granularity {
    id: string;
    description: string;
}

@Component({
    selector: 'multi-document-cohesion-grid',
    styleUrls: ['./multi-document-cohesion-grid.scss'],
    templateUrl: './multi-document-cohesion-grid.html',
    providers: [ApiRequestService]
})
export class MultiDocumentCohesionGridComponent implements OnInit, OnChanges {
    @Input() documentsetdata: any;
    @Input() thresholdargument: number;
    @Input() thresholdcontent: number;
    @Input() thresholdtopic: number;
    @Input() thresholdsemantic: number;

    private granularities = [{id: 'sentence', description: 'Sentence'}, {id: 'paragraph', description: 'Paragraph'}];
    private selectedGranularity: Granularity;

    level: string;
    //toggleLevel: Boolean; //Paragraph = false; Sentence = true

    //nodesColors = d3.scaleLinear().domain([1,10]).range([d3.rgb("#007AFF"), d3.rgb('#FFF500')]);
    //nodesColors = d3.scaleSequential().domain([1,100]).interpolator(d3.interpolateViridis);

    constructor(private apiRequestService: ApiRequestService) {}

    ngOnInit() {
        this.selectedGranularity = this.granularities[0];
        //this.toggleLevel = false;
        if (this.documentsetdata) {
            this.generateCohesionGrid(this.documentsetdata);
        }
    }

    ngOnChanges() {
        if (this.documentsetdata) {
            this.generateCohesionGrid(this.documentsetdata);
        }
    }

    onValueChange(event:any) {
        //this.toggleLevel = value;
        console.log(event);
        this.selectedGranularity = event;
        console.log("granularity " + this.selectedGranularity.id);
        if (this.documentsetdata) {
            console.log("generate again");
            this.generateCohesionGrid(this.documentsetdata);
        }
    }

    private clearData() {
        d3.select(".multi-document-cohesion-grid-content-svg").selectAll("*").remove();
    }

    private generateCohesionGrid(treeData) {
        this.clearData();

        var width = 2000, height=3000;
        // declares a tree layout and assigns the size
        var treemap = d3.tree().size([height, width]);

        // Assigns parent, children, height, depth
        var root = d3.hierarchy(treeData, function(d: any) { return d.children; });
        // root.x0 = height / 2;
        // root.y0 = 0;
        var data = treemap(root);


        var svgCohesionGraph = d3.select(".multi-document-cohesion-grid-content-svg").append("svg")
        .attr("width", width)
        .attr("height", height);

        var nodesColors = d3.scaleOrdinal().domain(["1","25"]).range(d3.schemeSet3);//d3.scaleSequential().domain([1,20]).interpolator(d3.interpolateViridis);


        var nodesDescendants = data.descendants();
        // Normalize for fixed-depth.
        nodesDescendants.forEach(function(d){ d.y = d.depth * 180});
        //console.log(nodesDescendants);


        var nodes = [];
        var colorContor = 1;
        if (this.selectedGranularity.id === 'sentence') { //Sentence
            console.log("sentence");
            data.children.forEach(document => {
                var sentences = [];
                document.children.forEach(pharagraph => {
                    pharagraph.children.forEach(sentence => {
                        var sentenceCopy: any = sentence;
                        sentenceCopy.color = nodesColors(colorContor.toString());
                        sentences.push(sentenceCopy);
                    });
                    colorContor ++;
                });
                nodes.push(sentences);
            });
        } else { //Pharagraph
            console.log("paragraph");
            data.children.forEach(document => {
                var pharagraphs = [];
                document.children.forEach(pharagraph => {
                    var pharagraphCopy: any = pharagraph;
                    pharagraphCopy.color = nodesColors(colorContor.toString());
                    pharagraphs.push(pharagraphCopy);
                    colorContor ++;
                });
                nodes.push(pharagraphs);
            });

        }

        var x = 1, y = 1;
        nodes.forEach(nodeDocument => {
            y = 1;
            svgCohesionGraph.append("circle")
                    .attr("cx",x*300)
                    .attr("cy",y*50)
                    .attr('r', function () {
                        return 0;
                    })
                    .style("fill", "grey");
            svgCohesionGraph.append('text')
                .attr("dy", y*50)
                .attr("x", x*300-60)
                .text("Document " + x)
                .style("font-weight", "bold")
                .style("font-size", "14px");
            y = 2;
            nodeDocument.forEach(node => {
                svgCohesionGraph.append("circle")
                    .attr("cx",x*300)
                    .attr("cy",y*60)
                    .attr('r', function () {
                        return (!node.data.importance || node.importance == 0) ? 10 : node.data.importance * 0.7;
                    })
                    .style("fill", node.color);

                svgCohesionGraph.append('text')
                    .attr("dy", y*60)
                    .attr("x", x*300-120)
                    .text(node.data.name)
                    .style("font-weight", "bold")
                    .style("font-size", "14px");

                node.cx = x*300;
                node.cy = y*60;
                y++;
            });
            x++;
        })

        var nameToNode = {};
        nodes.forEach(function (document: any) {
            document.forEach(element => {
                nameToNode[element.data.name] = element;
            });
        });

        this.generatePaths(data.data, nameToNode, svgCohesionGraph);
    }

    private generatePaths(data: any, nameToNode, svgCohesionGraph) {
        let thresholdMapping = new Map();
        thresholdMapping.set("LEXICAL_OVERLAP: CONTENT_OVERLAP", this.thresholdcontent);
        thresholdMapping.set("LEXICAL_OVERLAP: TOPIC_OVERLAP", this.thresholdtopic);
        thresholdMapping.set("SEMANTIC: WORD2VEC(coca)", this.thresholdsemantic);
        thresholdMapping.set("COREF", 0);

        let classMapping = new Map();
        classMapping.set("LEXICAL_OVERLAP: CONTENT_OVERLAP", "CONTENT_OVERLAP");
        classMapping.set("LEXICAL_OVERLAP: TOPIC_OVERLAP", "TOPIC_OVERLAP");
        classMapping.set("SEMANTIC: WORD2VEC(coca)", "SEMANTIC");
        classMapping.set("COREF", "COREF");

        //filter by threshold for each type of edge
        data.edges.forEach(edge => {
            edge.types = edge.types.filter(function (type) {
            return type.weight === null || type.weight >= thresholdMapping.get(type.name);
            });
        });

        // Define the div for the tooltip
        var weightTooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
        data.edges.forEach(function (edge) {
            var tooltipValue = '';
            if (edge.types.length > 0) {
                edge.types.forEach(element => {
                    var details = "";
                    if (element.details) {
                    element.details.forEach(detail => {
                        details += detail[0] + "<>" + detail[1] + ";";
                    });
                    }
                    element.weight === null ? tooltipValue += element.name + "</br>" + details:
                    tooltipValue += element.name + ": " + parseFloat(element.weight).toFixed(3) + "</br>" + details;
                });
                if (edge.types.length > 1) {
                    edge.color = 'connection-MULTIPLE';
                } else {
                    edge.color = 'connection-' + classMapping.get(edge.types[0].name);
                }
    
                var path = d3.path();
    
                if (nameToNode[edge.source] && nameToNode[edge.source]) {
                    var isArc = false;
                    if (nameToNode[edge.source].depth === 3){
                        console.log(nameToNode[edge.source]);
                        if (nameToNode[edge.source].parent.data.name === nameToNode[edge.target].parent.data.name || 
                            nameToNode[edge.source].parent.parent.data.name === nameToNode[edge.target].parent.parent.data.name) {
                            isArc = true;
                        } else {
                            isArc = false;
                        }
                    } else {
                        if (nameToNode[edge.source].parent.data.name === nameToNode[edge.target].parent.data.name) {
                            isArc = true;
                        } else {
                            isArc = false;
                        }
                    }
                    if (isArc) {
                        var xSource = nameToNode[edge.source].cx;
                        var ySource = nameToNode[edge.source].cy;
                        var xTarget = nameToNode[edge.target].cx;
                        var yTarget = nameToNode[edge.target].cy;
                        path.arc(xSource, (ySource + yTarget)/2, (Math.abs(yTarget - ySource))/2, -0.5 * Math.PI, 0.5 * Math.PI, false);
                        var pathString = path.toString();
                        var pathId = edge.source + edge.target;
                        svgCohesionGraph.append("path")
                            .attr("d", pathString)
                            .attr("id", pathId)
                            .attr('class', edge.color)
                            .attr("fill", "none")
                            .on('mouseover', function (d) {
                                d3.select(this).attr('class', 'pathMouseover');
                                weightTooltip.transition()
                                    .duration(200)
                                    .style("opacity", .9);
                                weightTooltip.html(edge.source + " => " + edge.target + "</br>" + tooltipValue)
                                .style("color", "red")
                                        .style("left", (d3.event.pageX) + "px")
                                        .style("top", (d3.event.pageY - 28) + "px");
        
                            })
                            .on('mouseout', function (d) {
                                d3.select(this).attr('class', edge.color);
                                weightTooltip.transition()
                                    .duration(500)
                                    .style("opacity", 0);
                            })
                    } else {
                        var xSource = nameToNode[edge.source].cx;
                        var ySource = nameToNode[edge.source].cy;
                        var xTarget = nameToNode[edge.target].cx;
                        var yTarget = nameToNode[edge.target].cy;
                        path.moveTo(xSource, ySource);
                        path.lineTo(xTarget, yTarget);
                        path.closePath();
                        var pathString = path.toString();
                        var pathId = edge.source + edge.target;
                        svgCohesionGraph.append("path")
                            .attr("d", pathString)
                            .attr("id", pathId)
                            .attr('class', edge.color)
                            .on('mouseover', function (d) {
                                d3.select(this).attr('class', 'pathMouseover');
                                weightTooltip.transition()
                                    .duration(200)
                                    .style("opacity", .9);
                                weightTooltip.html(edge.source + " => " + edge.target + "</br>" + tooltipValue)
                                .style("color", "red")
                                        .style("left", (d3.event.pageX) + "px")
                                        .style("top", (d3.event.pageY - 28) + "px");
        
                            })
                            .on('mouseout', function (d) {
                                d3.select(this).attr('class', edge.color);
                                weightTooltip.transition()
                                    .duration(500)
                                    .style("opacity", 0);
                            })
                    }
                }
          
            }
            
        });
    }
}
