import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClientModule, HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

import { ApiResponseModel } from './api-response.model';
import { ConfigService } from '../../config/config.service';
import { ReaderBenchService } from '../../readerbench.service';
import { Config } from '../../config/config.interface';

@Injectable()
export class ApiRequestService {

    private config: Config;
    private error: string;
    private serviceName: string = "";
    private headers: any = "";
    public readonly HEADERS_TYPE_COMMON_REQUEST = 1;
    public readonly HEADERS_TYPE_FILE_UPLOAD = 2;

    private readConfig() {
        this.configService.getConfig()
            .subscribe(
                (data: Config) => this.config = data, // success path
                error => this.error = error // error path
            );
    }

    public getApiEndpoint(): string {
        return this.config.apiServer + this.config.pathDelimiter +
            this.config.apiPort + this.config.pathDelimiter +
            this.config.apiEndpoints[this.serviceName];
    }

    constructor(private http: HttpClient, private configService: ConfigService, private readerBenchService: ReaderBenchService) {
        this.readConfig();
        this.setHeaders(this.HEADERS_TYPE_COMMON_REQUEST);
    }

    public setApiService(serviceName: string) {
        if (!this.config.apiEndpoints.hasOwnProperty(serviceName)) {
            this.readerBenchService.logError('Config file does not contain an API endpoint for service ' + serviceName);
            return;
        }
        this.serviceName = serviceName;
    }

    public setCommonService(serviceName: string) {
        if (!this.config.commonEndpoints.hasOwnProperty(serviceName)) {
            this.readerBenchService.logError('Config file does not contain a common endpoint for service ' + serviceName);
            return;
        }
        this.serviceName = serviceName;
    }

    public setHeaders(type: number) {
        if (this.config == null) {
            this.readerBenchService.logError('Configuration data was not read!');
            return;
        }

        switch (type) {
            case this.HEADERS_TYPE_FILE_UPLOAD:
                this.headers = this.config.apiHeaders['uploadRequest'];
                break;
            default:
                this.headers = this.config.apiHeaders['commonRequest'];
                break;
        }
    }

    public upload(file) {
        var formData = new FormData();
        formData.append('file', file, file.name);
        return this.process(formData);
      }

    public process(body: Object): Observable<ApiResponseModel> {
        if (this.serviceName == "") {
            this.readerBenchService.logError('The service name is not set!');
            return;
        }
        if (this.headers == "") {
            this.readerBenchService.logError('The service headers were not set!');
            return;
        }
        let httpOptions = {
            headers: this.headers
        }

        return this.http.post<ApiResponseModel>(this.getApiEndpoint(), body, httpOptions)
            .pipe(
                tap( // Log the result or error
                    data => console.log(data),
                    error => catchError(this.handleError) // then handle the error
                )
            )
    }

    public downloadFile(fileName) {
        this.configService.getFile(fileName)
            .subscribe(results => this.readerBenchService.log(results));
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    };

}
