import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SitemorseService {

    constructor (private httpClient: HttpClient) {
    }

    public analyzeUrl (baseurl : string, searchurl : string) {
        return this.httpClient.get(`${baseurl}/?url=${searchurl}`);
    }
}
