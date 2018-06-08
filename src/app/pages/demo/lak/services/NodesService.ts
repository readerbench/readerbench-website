import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import { AppContext, RbServerApi } from '../../../../common/AppContext';
import { TwoModeGraphNodeDO } from '../../../../common/components/two-mode-graph/data-objects/TwoModeGraphNodeDO';
import { ISearchInputService } from '../../../../common/components/auto-complete-input-search/ISearchInputService';

@Injectable()
export class NodesService implements ISearchInputService<TwoModeGraphNodeDO> {
    private _nodeList: TwoModeGraphNodeDO[] = [];

    constructor(private _appContext: AppContext) { }

    public getLakNodes(): Observable<TwoModeGraphNodeDO[]> {
        return this._appContext.thHttp.get(RbServerApi.LakNodes).map((authorList: Object[]) => {
            var nodeList: TwoModeGraphNodeDO[] = [];
            _.forEach(authorList, (author: Object) => {
                var node = new TwoModeGraphNodeDO();
                node.buildFromObject(author);
                nodeList.push(node);
            });
            this._nodeList = nodeList;
            return nodeList;
        });
    }

    public searchItemsByText(text: string): Observable<TwoModeGraphNodeDO[]> {
        return new Observable<TwoModeGraphNodeDO[]>((observer: Observer<TwoModeGraphNodeDO[]>) => {
            var filteredItems = this.filterItemsByText(text);
            observer.next(filteredItems);
            observer.complete();
        });
    }

    private filterItemsByText(text: string): TwoModeGraphNodeDO[] {
        return _.filter(this._nodeList, (node: TwoModeGraphNodeDO) => {
            return node.displayName.toLocaleLowerCase().indexOf(text) !== -1;
        });
    }
}