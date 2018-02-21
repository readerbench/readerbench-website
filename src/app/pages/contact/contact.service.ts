import { Injectable } from '@angular/core';
import { Http, HttpModule, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { ContactResponseModel } from './contact-response.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ContactService {

    constructor(private http: Http) { }

    private url = '//readerbench.com:9001/';
    private endpoint: string;

    public setEndpoint(endpoint) {
        this.endpoint = endpoint;
    }

    process(body: Object): Observable<ContactResponseModel> {
        let bodyString = JSON.stringify(body);
        let headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.url + this.endpoint, body, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

}
