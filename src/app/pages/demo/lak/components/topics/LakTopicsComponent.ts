import { Component, OnInit } from '@angular/core';
import { RbError, AppContext, RbServerApi } from '../../../../../common/AppContext';
import { TwoModeGraphNodeDO, TwoModeGraphNodeType } from '../../../../../common/components/two-mode-graph/data-objects/TwoModeGraphNodeDO';
import { TwoModeGraphDO } from '../../../../../common/components/two-mode-graph/data-objects/TwoModeGraphDO';
import { TwoModeGraphEdgeDO } from '../../../../../common/components/two-mode-graph/data-objects/TwoModeGraphEdgeDO';

@Component({
    selector: 'lak-topics-component',
    templateUrl: '/app/src/components/reader-bench/modules/lak/components/topics/template/lak-topics-component.html'
})
export class LakTopicsComponent implements OnInit {
    private static WordDistanceThreshold = 0.2;
    private static MaxNoConcepts = 25;

    isLoading = true;
    lakYears: number[];
    isLoadingGraph: boolean = false;
    graph: TwoModeGraphDO;
    selectedYear: number;
    concepts = [];

    constructor(private _appContext: AppContext) { }

    ngOnInit() {
        this._appContext.thHttp.get(RbServerApi.LakYears).subscribe((years: number[]) => {
            this.lakYears = years;
            this.lakYears.push(null);
            if (this.lakYears.length > 0) {
                this.showYear(this.lakYears[0]);
            }
            this.isLoading = false;
        });
    }

    showYear(year: number) {
        this.selectedYear = year;
        this.isLoadingGraph = true;
        this._appContext.thHttp.post(RbServerApi.LakTopics, { year: year, threshold: LakTopicsComponent.WordDistanceThreshold })
            .subscribe((graph: any) => {
                this.graph = this.parseGraphData(graph);
                this.concepts = _.first(graph.nodes, LakTopicsComponent.MaxNoConcepts);
                this.isLoadingGraph = false;
            }, (err: RbError) => {
                this._appContext.toaster.error(err.message);
                this.isLoadingGraph = false;
            });
    }
    private parseGraphData(inGraph): TwoModeGraphDO {
        var graph = new TwoModeGraphDO();
        inGraph.nodes.forEach((inNode) => {
            var node = new TwoModeGraphNodeDO();
            node.uri = inNode.id;
            node.displayName = inNode.name;
            node.type = "Word";
            graph.nodeList.push(node);
        });
        inGraph.links.forEach((inLink) => {
            var edge = new TwoModeGraphEdgeDO();
            edge.edgeType = "Word";
            edge.score = inLink.score;
            edge.sourceUri = inLink.source;
            edge.targetUri = inLink.target;
            graph.edgeList.push(edge);
        });
        return graph;
    }
}