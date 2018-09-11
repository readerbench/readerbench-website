import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CMResult } from './data-objects/cm-result.do';
import { ApiRequestService } from '../../api-request.service';
import { ApiResponseModel } from '../../api-response.model';

export interface CiModelParams {
  text: string;
  minActivationThreshold: number;
  maxSemanticExpand: number;
}

@Injectable()
export class CIModelService {

  constructor(private apiRequestService: ApiRequestService) {
    this.apiRequestService.setApiService("ciModelAnalyzer");
  }

  public getWords(params: CiModelParams): Observable<CMResult> {
    var process = this.apiRequestService.process(params);
    process.subscribe(response => {
      const cmResult = new CMResult();
      cmResult.buildFromObject(response.data);
      return cmResult;
    });
    return null; // fix me
  }

}
