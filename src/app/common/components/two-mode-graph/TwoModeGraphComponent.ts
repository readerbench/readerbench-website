import { Component, AfterViewInit, Input, Inject, ElementRef } from '@angular/core';
import { TwoModeGraphDO } from './data-objects/TwoModeGraphDO';
import { TwoModeGraphNodeDO } from './data-objects/TwoModeGraphNodeDO';
import { TwoModeGraphEdgeDO } from './data-objects/TwoModeGraphEdgeDO';

@Component({
    selector: 'two-mode-graph',
    template: ''
})
export class TwoModeGraphComponent implements AfterViewInit {
    private _graph: TwoModeGraphDO;
    public get graph(): TwoModeGraphDO {
        return this._graph;
    }
    @Input()
    public set graph(graph: TwoModeGraphDO) {
        this._graph = graph;
        this.initGraph();
    }

    private _didInit: boolean = false;

    constructor( @Inject(ElementRef) private _elementRef: ElementRef) { }

    ngAfterViewInit() {
        this._didInit = true;
        this.initGraph();

    }

    private initGraph() {
        if (!this.graph || !this._didInit) { return; }
        var nodesResult = this.getNodes();
        var nodes = nodesResult.nodes;
        var links = this.getLinks(nodesResult.nodeIndexMap);
        this.buildD3JsGraph({
            nodes: nodes,
            links: links
        }, this._elementRef.nativeElement, false);
    }

    private getNodes(): { nodes: any[], nodeIndexMap: Object } {
        var parsedNodeList: any[] = [];
        var nodeIndexMap = {};
        _.forEach(this._graph.nodeList, (node: TwoModeGraphNodeDO, index: number) => {
            parsedNodeList.push({
                name: node.displayName,
                group: (node.uri === this.graph.centerUri) ? "Center" : node.type,
                active: node.active,
            });
            nodeIndexMap[node.uri] = index;
        });
        return {
            nodes: parsedNodeList,
            nodeIndexMap: nodeIndexMap
        };
    }
    private getLinks(nodeIndexMap: Object): any[] {
        var parsedEdgeList: any[] = [];
        _.forEach(this._graph.edgeList, (edge: TwoModeGraphEdgeDO) => {
            parsedEdgeList.push({
                source: nodeIndexMap[edge.sourceUri],
                target: nodeIndexMap[edge.targetUri],
                value: edge.score,
                type: edge.edgeType
            });
        });
        return parsedEdgeList;
    }

    private buildD3JsGraph(graph, element, enableFisheye) {
        var width = $(element).width();
        var height = 700;

        var colorStatuses = {
            "Author": "#fc4a1a",
            "Article": "#4abdac",
            "UserQuery": "#dfdce3",
            "Word": "#1f77b4",
            "Inferred": "#fc4a1a",
            "TextBased": "#4abdac",
            "Inactive": "#dfdce3",
            "Center": "#0e84d3",
            "CENTRAL" : "#1E90FF",
            "ACTIVE" : "#228B22",
            "PERIPHERAL" : "#FF8C00"
        };

        let color = d3.scale.ordinal();
        var domain = this._graph.getUsedNodeTypes();

        var ranges = [];
        var foundAllRanges = true;
        domain.forEach(value => {
            if (colorStatuses[value]) {
                ranges.push(colorStatuses[value]);
            }
            else {
                foundAllRanges = false;
            }
        });
        color.domain(domain);
        if (!foundAllRanges) {
            color = d3.scale.category10().domain(domain);
        }
        else {
            color.range(ranges);
        }

        var force = d3.layout.force()
            .nodes(graph.nodes)
            .links(graph.links)
            .size([width, height])
            .charge(-100).linkDistance(300)
            .start();

        var svg = d3.select(element)
            .append("svg") 
            .attr("width", width)
            .attr("height", height);

        var maxLinkCount = 1;

        // append degree info
        graph.links.forEach(function (link) {
            if (!link.source["linkCount"]) link.source["linkCount"] = 0;
            if (!link.target["linkCount"]) link.target["linkCount"] = 0;

            if (link.source.group != "Inactive") {
                link.source["linkCount"]++;
            }
            else {
                link.source["linkCount"] = 5;
            }
            if (link.target.group != "Inactive") {
                link.target["linkCount"]++;
            }
            else {
                link.target["linkCount"] = 5;
            }

            if (link.source["linkCount"] > maxLinkCount) {
                maxLinkCount = link.source["linkCount"];
            }
            if (link.target["linkCount"] > maxLinkCount) {
                maxLinkCount = link.target["linkCount"];
            }
        });

        var link = svg.selectAll("line")
            .data(graph.links)
            .enter().append("line")
            .attr("class", "link")
            .style("stroke-width", function (d: any) { return Math.sqrt(d.value); });

        var node = svg.selectAll("g")
            .data(graph.nodes)
            .enter()
            .append("g");

        node.append("circle")
            .attr("r", function (d: any) {
                return (d.linkCount / maxLinkCount) * 20;
            })
            .style("fill", <any>function (d: any) { 
                //  if(d.group === 1) {
                //      return '#1E90FF';
                //  } else if(d.group === 2) {
                //      return '#228B22';
                //  } else if (d.group === 3) {
                //      return '#FF8C00';
                //  } else {
                //      return '#FF0000';
                //  }
                 return color(d.group); 
                })
            .call(force.drag);

        node.append("text")
            .attr("x", 12)
            .attr("dy", ".35em")
            .style("fill", "#333333")
            .text(function (d: any) { return d.name; });

        force.on("tick", function () {
            link.attr("x1", function (d: any) {
                return d.source.x;
            }).attr("y1", function (d: any) {
                return d.source.y;
            }).attr("x2", function (d: any) {
                return d.target.x;
            }).attr("y2", function (d: any) {
                return d.target.y;
            });
            node.attr("transform", function (d: any) {
                return "translate(" + d.x + "," + d.y + ")";
            });
        });

        //Legend
        var legend = svg.selectAll(".legend")
            .data(color.domain())
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function (d, i) { return "translate(0," + i * 35 + ")"; });

        legend.append("rect")
            .attr("x", width - 18)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", <any>color);

        legend.append("text")
            .attr("x", width - 30)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .text(function (d: any) {  return d; });
    }
}