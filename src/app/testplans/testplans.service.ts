import { Injectable } from '@angular/core';

import { Testplan } from './testplan';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../environments/environment';

@Injectable()
export class TestplanService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private testPlanUrl = environment.api_url + '/test_plans';  // URL to web api

  constructor(private http: Http) {
   }

  getTestPlans(): Promise<Testplan[]> {
    return this.http.get(this.testPlanUrl)
               .toPromise()
               .then(response => response.json() as Testplan[])
               .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
