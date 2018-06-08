import { Observable } from 'rxjs/Observable';
import { Observer } from "rxjs/Observer";
import { Injectable, Inject } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { IRbHttp, UploadedFileResponse } from './IRbHttp';

import { RbUtils } from '../RbUtils';
import { RbError } from '../responses/RbError';
import { RbServerApi, ServerApiBuilder } from './RbServerApi';

@Injectable()
export class RbHttp implements IRbHttp {
    private static HttpOk = 200;
    private static MaxFileSizeBytes: number = 16 * 1024 * 1024;

    private _rbUtils: RbUtils;

    constructor(private _http: Http) {
        this._rbUtils = new RbUtils();
    }

    private getApiUrl(serverApi: RbServerApi): string {
        var builder = new ServerApiBuilder(serverApi);
        return builder.getUrl();
    }

    public get(serverApi: RbServerApi, parameters?: Object): Observable<Object> {
        var url = this.getApiUrl(serverApi);
        var searchParams = this.buildSearchParameters(parameters);

        return new Observable<Object>((observer: Observer<Object>) => {
            this._http.get(url, {
                search: searchParams,
                body: JSON.stringify(this.getDefaultReqParams()),
                headers: this.getDefaultHeaders()
            }).subscribe((res: Response) => {
                this.parseResult(res, observer);
            }, (err: any) => {
                this.parseError(err, observer);
            });
        });
    }
    private getDefaultReqParams(): Object {
        return {
        };
    }
    private buildSearchParameters(parameters: Object): URLSearchParams {
        let urlSearchParams: URLSearchParams = new URLSearchParams();
        if (this._rbUtils.isUndefinedOrNull(parameters)) {
            return urlSearchParams;
        }
        var keys = Object.keys(parameters);
        keys.forEach(key => {
            urlSearchParams.set(key, parameters[key]);
        });
        return urlSearchParams;
    }

    public post(serverApi: RbServerApi, parameters: Object): Observable<Object> {
        var url = this.getApiUrl(serverApi);
        var actualParams = this.getDefaultReqParams();
        if (_.isObject(parameters)) {
            actualParams = _.extend(actualParams, parameters);
        }
        return new Observable((observer: Observer<Object>) => {
            this._http.post(url, JSON.stringify(actualParams), {
                headers: this.getDefaultHeaders()
            }).subscribe((res: Response) => {
                this.parseResult(res, observer);
            }, (err: any) => {
                this.parseError(err, observer);
            });
        });
    }

    private getDefaultHeaders(): Headers {
        return new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        });
    }

    public uploadFile(file: File): Observable<UploadedFileResponse> {
        let url = this.getApiUrl(RbServerApi.ServiceUploadFile);
        return new Observable<UploadedFileResponse>((observer: Observer<UploadedFileResponse>) => {
            if (file.size > RbHttp.MaxFileSizeBytes) {
                var rbError = new RbError("The maximum file size is 16MB");
                observer.error(rbError);
                observer.complete();
                return;
            }
            let formData: FormData = new FormData();
            let xhr: XMLHttpRequest = new XMLHttpRequest();

            formData.append("file", file, file.name);

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        var resultJson = JSON.parse(xhr.response);
                        this.parseJsonResult(resultJson, observer);
                    } else {
                        observer.error(xhr.response);
                    }
                }
            };
            xhr.open('POST', url, true);
            xhr.send(formData);
        });
    }
    private parseError(error: any, observer: Observer<Object>) {
        observer.error(new RbError(error.message));
        observer.complete();
    }

    private parseResult(result: Response, observer: Observer<Object>) {
        if (result.status == RbHttp.HttpOk) {
            var resultJson: Object = result.json();
            this.parseJsonResult(resultJson, observer);
        }
        else {
            observer.error(new RbError(result.statusText));
            observer.complete();
        }
    }
    private parseJsonResult(resultJson: Object, observer: Observer<Object>) {
        if (resultJson["success"] === true) {
            observer.next(resultJson["data"]);
            observer.complete();
            return;
        }
        observer.error(new RbError(resultJson["errorMsg"]));
        observer.complete();
    }
}