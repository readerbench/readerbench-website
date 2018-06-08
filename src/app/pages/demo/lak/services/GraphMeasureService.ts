import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {AppContext, RbServerApi} from '../../../../common/AppContext';
import {GraphMeasureDO} from './data-objects/measure/GraphMeasureDO';

@Injectable()
export class GraphMeasureService {
    constructor(private _appContext: AppContext) { }

    public getLakMesures(): Observable<GraphMeasureDO[]> {
        return this._appContext.thHttp.get(RbServerApi.LakMeasures).map((measureObjectList: Object[]) => {
            var measureList: GraphMeasureDO[] = [];
            _.forEach(measureObjectList, (measureObject: Object) => {
                var measure = new GraphMeasureDO();
                measure.buildFromObject(measureObject);
                measureList.push(measure);
            });
            return measureList;
        });
    }
}