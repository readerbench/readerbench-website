import {Observable} from 'rxjs/Observable';
import {OpaqueToken} from '@angular/core';
import {RbServerApi} from './RbServerApi';

export interface UploadedFileResponse {
    url: string;
}

export interface IRbHttp {
    get(serverApi: RbServerApi, parameters?: Object): Observable<Object>;
    post(serverApi: RbServerApi, parameters: Object): Observable<Object>;
    uploadFile(file: File): Observable<UploadedFileResponse>;
}
export const IRbHttp = new OpaqueToken("IRbHttp");