import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';

import { WordActivationDO } from "./data-objects/WordActivationDO";
import { AppContext, RbServerApi } from "../AppContext";
import { CMResultDO } from "./data-objects/CMResultDO";


export interface CiModelParams {
    text: string;
    minActivationThreshold: number;
    maxSemanticExpand: number;
}

@Injectable()
export class CIModelService {

    constructor(private _appContext: AppContext) {
    }

    public getWords(params: CiModelParams): Observable<CMResultDO> {
        return this._appContext.thHttp.post(RbServerApi.CiModel, params)
            .map((ciModelObject: Object) => {
                var cmResult = new CMResultDO();
                cmResult.buildFromObject(ciModelObject);
                return cmResult;
            });
    }
}