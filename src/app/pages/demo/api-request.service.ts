import { Injectable } from '@angular/core';
import { Http, HttpModule, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { ApiResponseModel } from './api-response.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ApiRequestService {

    constructor(private http: Http) { }

    private url = '//localhost:8080/api/';
    // private url = '//readerbench.com/api/';
    private endpoint: string;
    private headers: Headers;

    public setEndpoint(endpoint) {
        this.endpoint = endpoint;
    }

    public setHeaders(headers) {
        this.headers = headers;
    }

    process(body: Object): Observable<ApiResponseModel> {
        let bodyString = JSON.stringify(body);
        let options = new RequestOptions({ headers: this.headers });

        return this.http.post(this.url + this.endpoint, body, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

}
