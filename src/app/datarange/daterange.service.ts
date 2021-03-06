import { Injectable } from '@angular/core';

import { Daterange } from './daterange';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class DaterangeService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private dateRangeUrl = 'https://ubmetrics.herokuapp.com/test_plans';  // URL to web api

  constructor(private http: Http) { }

  getDateRanges(): Promise<Daterange[]> {
    return this.http.get(this.dateRangeUrl)
               .toPromise()
               .then(response => response.json().data as Daterange[])
               .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}