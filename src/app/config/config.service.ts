import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Config } from './config.interface';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { ReaderBenchService } from '../readerbench.service';

@Injectable()
export class ConfigService {

    private configUrl: string = 'assets/config.json';

    constructor(private http: HttpClient, private readerBenchService: ReaderBenchService) { }

    public getConfig() {
        return this.http.get<Config>(this.configUrl)
            .pipe(
                retry(3), // retry a failed request up to 3 times
                catchError(this.handleError) // then handle the error
            );
    }

    public getConfigResponse(): Observable<HttpResponse<Config>> {
        return this.http.get<Config>(
            this.configUrl, { observe: 'response' });
    }

    public getFile(filename: string) {
        // The Observable returned by get() is of type Observable<string>
        // because a text response was specified.
        // There's no need to pass a <string> type parameter to get().
        return this.http.get(filename, { responseType: 'text' })
            .pipe(
                tap( // Log the result or error
                    data => this.readerBenchService.log(filename, data),
                    error => this.readerBenchService.logError(filename, error)
                )
            );
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
