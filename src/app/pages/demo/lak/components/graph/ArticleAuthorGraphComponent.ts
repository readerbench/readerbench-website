import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { RbError, AppContext } from '../../../../../common/AppContext';
import { NodesService } from '../../services/NodesService';
import { GraphService } from '../../services/GraphService';
import { TwoModeGraphNodeDO, TwoModeGraphNodeType } from '../../../../../common/components/two-mode-graph/data-objects/TwoModeGraphNodeDO';
import { TwoModeGraphDO } from '../../../../../common/components/two-mode-graph/data-objects/TwoModeGraphDO';
import { SearchInputTextComponent } from '../../../../../common/components/auto-complete-input-search/SearchInputTextComponent';

interface ViewOption {
    showAuthors: boolean, showArticles: boolean, displayName: string
}

@Component({
    selector: 'article-author-graph',
    templateUrl: '/app/src/components/reader-bench/modules/lak/components/graph/template/article-author-graph.html'
})
export class ArticleAuthorGraphComponent implements OnInit, AfterViewInit {
    @ViewChild(SearchInputTextComponent)
    private _nodeSearchTextInputComponent: SearchInputTextComponent<TwoModeGraphNodeDO>;

    isLoading: boolean = false;
    private _defaultNode: TwoModeGraphNodeDO;
    private _selectedNode: TwoModeGraphNodeDO;
    noAuthors: number = 10;
    noArticles: number = 10;
    searchText: string = "";

    isLoadingGraph: boolean = false;
    graph: TwoModeGraphDO;
    viewOptions: [ViewOption] = [
        { showAuthors: true, showArticles: true, displayName: "Show authors and articles" },
        { showAuthors: true, showArticles: false, displayName: "Show only authors" },
        { showAuthors: false, showArticles: true, displayName: "Show only articles" }
    ];
    private _selectedViewOption: ViewOption = this.viewOptions[0];

    constructor(private _appContext: AppContext,
        private _nodesService: NodesService,
        private _graphService: GraphService) { }

    ngOnInit() {
        this.isLoading = true;
        this._nodesService.getLakNodes().subscribe((nodeList: TwoModeGraphNodeDO[]) => {
            var allNode = new TwoModeGraphNodeDO();
            allNode.displayName = "All";
            allNode.type = "Author";
            allNode.uri = "";
            this._defaultNode = allNode;
            this.selectedNode = this._defaultNode;
            this.isLoading = false;
        }, (err: RbError) => {
            this._appContext.toaster.error(err.message);
            this.isLoading = false;
        });
    }
    ngAfterViewInit() {
        this._nodeSearchTextInputComponent.bootstrap(this._nodesService, {
            displayStringPropertyId: "displayName",
            objectPropertyId: "uri"
        });
    }

    public get selectedNode(): TwoModeGraphNodeDO {
        return this._selectedNode;
    }
    public set selectedNode(selectedNode: TwoModeGraphNodeDO) {
        this._selectedNode = selectedNode;
    }

    public processSelectedNode() {
        if (!this.selectedNode) { return; }
        this.isLoadingGraph = true;
        this._graphService.getLakGraph(this.selectedNode.uri, this.noAuthors, this.noArticles,
            this._selectedViewOption.showAuthors, this._selectedViewOption.showArticles, this.searchText)
            .subscribe((graph: TwoModeGraphDO) => {
                this.isLoadingGraph = false;
                this.graph = graph;
            }, (err: RbError) => {
                this._appContext.toaster.error(err.message);
                this.isLoadingGraph = false;
            });
    }

    public didSelectNode(node: TwoModeGraphNodeDO) {
        this.selectedNode = node;
    }
    public didDeselectNode() {
        this.selectedNode = this._defaultNode;
    }
    public get selectedViewOption(): ViewOption {
        return this._selectedViewOption;
    }
    public set selectedViewOption(selectedViewOption: ViewOption) {
        this._selectedViewOption = selectedViewOption;
    }
}