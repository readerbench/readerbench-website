import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AppContext, RbServerApi } from '../../../../common/AppContext';
import { TwoModeGraphDO } from '../../../../common/components/two-mode-graph/data-objects/TwoModeGraphDO';

@Injectable()
export class GraphService {
    constructor(private _appContext: AppContext) { }

    public getLakGraph(centerUri: string, noAuthors: number, noArticles: number,
        showAuthors: boolean, showArticles: boolean, searchText: string): Observable<TwoModeGraphDO> {
        return this._appContext.thHttp.post(RbServerApi.LakGraph, {
            centerUri: centerUri,
            noAuthors: noAuthors,
            noArticles: noArticles,
            showAuthors: showAuthors,
            showArticles: showArticles,
            searchText: searchText
        }).map((graphObject: Object) => {
            var graph = new TwoModeGraphDO();
            graph.buildFromObject(graphObject);
            graph.centerUri = centerUri;
            return graph;
        });
    }
}