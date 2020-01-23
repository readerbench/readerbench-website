import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {HttpClientModule, HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry, tap} from 'rxjs/operators';

import {ApiResponseModel} from './api-response.model';
import {ConfigService} from '../../config/config.service';
import {ReaderBenchService} from '../../readerbench.service';
import {Config} from '../../config/config.interface';

@Injectable()
export class ApiRequestService {

    private url = '//127.0.0.1:8080/api/';
    private endpoint: string;
    private config: Config;
    private error: string;
    private serviceName: string;
    private headers: any;
    public readonly HEADERS_TYPE_COMMON_REQUEST = 1;
    public readonly HEADERS_TYPE_FILE_UPLOAD = 2;

    constructor(private http: HttpClient, private configService: ConfigService, private readerBenchService: ReaderBenchService) {
        this.readConfig();
    }

    private readConfig() {
        this.config = this.configService.getConfig();
        // this.configService.getConfig()
        //     .subscribe(
        //         (data: Config) => this.config = {
        //             apiProtocol: data['apiProtocol'],
        //             apiServer: data['apiServer'],
        //             apiPort: data['apiPort'],
        //             apiPath: data['apiPath'],
        //             portDelimiter: data['portDelimiter'],
        //             pathDelimiter: data['pathDelimiter'],
        //             apiEndpoints: data['apiEndpoints'],
        //             commonEndpoints: data['commonEndpoints'],
        //             apiHeaders: data['apiHeaders']
        //         },
        //         error => this.error = error // error path
        //     );
    }

    public getApiEndpoint(): string {
        if (this.config.apiEndpoints[this.serviceName] === undefined) {
            return this.getMailServerEndpoint();
        }

        if (this.serviceName === 'curriculumRecommendation') {
            return this.config.apiProtocol + this.config.portDelimiter + this.config.pathDelimiter + this.config.pathDelimiter +
                this.config.testServerPath +
                this.config.pathDelimiter + this.config.apiPath + this.config.pathDelimiter +
                this.config.apiEndpoints[this.serviceName];
        }

        return this.config.apiProtocol + this.config.portDelimiter + this.config.pathDelimiter + this.config.pathDelimiter +
            this.config.apiServer +
            ((this.config.apiPort !== 80) ? (this.config.portDelimiter +
                this.config.apiPort) : '') +
            this.config.pathDelimiter + this.config.apiPath + this.config.pathDelimiter +
            this.config.apiEndpoints[this.serviceName];
    }

    public getMailServerEndpoint(): string {
        return this.config.apiProtocol + this.config.portDelimiter + this.config.pathDelimiter + this.config.pathDelimiter +
            this.config.mailServer +
            ((this.config.mailPort !== 80) ? (this.config.portDelimiter +
                this.config.mailPort) : '') +
            this.config.pathDelimiter + this.config.mailPath + this.config.pathDelimiter +
            this.config.commonEndpoints[this.serviceName];
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

    public getHeaders() {
        return this.headers;
    }

    public upload(file) {
        const formData = new FormData();
        formData.append('file', file, file.name);
        return this.process(formData);
    }

    public process(body: Object): Observable<ApiResponseModel> {
        if (this.serviceName === '') {
            this.readerBenchService.logError('The service name is not set!');
            return;
        }
        if (this.headers === '') {
            this.readerBenchService.logError('The service headers were not set!');
            return;
        }
        const httpOptions = {
            headers: this.headers
        };

        console.log(this.getApiEndpoint());
        return this.http.post<ApiResponseModel>(this.getApiEndpoint(), body, httpOptions)
            .pipe(
                tap( // Log the result or error
                    data => data,
                    error => catchError(this.handleError) // then handle the error
                )
            );
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
    }
}
