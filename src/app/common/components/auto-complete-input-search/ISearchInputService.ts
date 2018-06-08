import { Observable } from 'rxjs/Observable';

export interface ISearchInputService<T> {
    searchItemsByText(text: string): Observable<T[]>;
}