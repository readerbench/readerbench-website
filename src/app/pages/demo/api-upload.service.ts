import { Injectable } from '@angular/core';
import { Http, HttpModule, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { ApiResponseModel } from './api-response.model';

@Injectable()
export class ApiUploadService {

  constructor(private http: Http) { }

  private url = '//localhost:8080/api/';
  // private url = '//readerbench.com/api/';
  private endpoint: string;
  private headers: Headers;
  private formData: FormData;

  public setEndpoint(endpoint) {
      this.endpoint = endpoint;
  }

  public setHeaders(headers) {
      this.headers = headers;
  }

  public setFile(file) {
    this.formData = new FormData();
    this.formData.append('file', file, file.name);
  }

  process(): Observable<ApiResponseModel> {
      let options = new RequestOptions({ headers: this.headers });

      return this.http.post(this.url + this.endpoint, this.formData, options)
          .map((res: Response) => res.json())
          .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
