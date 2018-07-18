import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

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
    this.apiRequestService.setEndpoint('ci-model/analyzer');
  }

  public getWords(params: CiModelParams): Observable<CMResult> {
    return this.apiRequestService.process(params)
      .map((response: ApiResponseModel) => {
        const cmResult = new CMResult();
        cmResult.buildFromObject(response.data);
        return cmResult;
      });
  }
}
