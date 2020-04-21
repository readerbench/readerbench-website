import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CMResult } from './data-objects/cm-result.do';
import { ApiRequestService } from '../../api-request.service';

export interface CiModelParams {
  text: string;
  semanticModel: string;
  minActivationThreshold: number;
  maxActiveConcepts: number;
  maxSemanticExpand: number;
  language: string;
}

@Injectable()
export class CIModelService {

  constructor(
    private apiRequestService: ApiRequestService,
  ) {
    this.apiRequestService.setHeaders(this.apiRequestService.HEADERS_TYPE_COMMON_REQUEST);
    this.apiRequestService.setApiService('ciModelAnalyzer');
  }

  public getWords(params: CiModelParams): Observable<CMResult> {
    const process = this.apiRequestService.process(params);
    return process
      .pipe(map(response => {
        const cmResult = new CMResult();
        cmResult.buildFromObject(response.data);
        return cmResult;
      }));
  }

}
