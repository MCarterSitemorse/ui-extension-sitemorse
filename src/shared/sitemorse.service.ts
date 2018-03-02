import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SitemorseService {
    url: string = null;

    public contextChanged$: Observable<any>;

    constructor (private httpClient: HttpClient) {
        this.url = this.determineUrl();

        this.contextChanged$ = Observable.create((observer) => {
            (window as any).Hippo.onContextChanged = (context) => {
                observer.next(context);
            };
        });
    }

    public analyzeUrl (url: string) {
        //return this.httpClient.get(`${this.url}/sitemorse/api/get/?url=${url}/`);
        //var test:string = `${this.url}/site/sitemorse/?url=${url}`;
        //console.log("Test url:");
        //console.log(test);
        //test.replace(/\/+$/, '/');
        //console.log(test);
        //return this.httpClient.get(test);
        return this.httpClient.get(`${this.url}/site/sitemorse/?url=${url}`);
    }

    public determineUrl() {
        return window.location.origin;
    }
}
