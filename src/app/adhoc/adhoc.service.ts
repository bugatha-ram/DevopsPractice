import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../environments/environment';

@Injectable()
export class AdhocService {
  private colsdisplayUrl = environment.api_url + '/adhoc';  // URL to web api

  constructor(private http: Http) {
  }

  public getReport(data: any): any {
    let params = new URLSearchParams();
    for (let key in data) {
      params.set(key, data[key])
    }
    return this.http.get(this.colsdisplayUrl, { search: params })
      .toPromise()
      .then(function(response: any) {
        return response.json();
      })
      .catch();
  }
}



