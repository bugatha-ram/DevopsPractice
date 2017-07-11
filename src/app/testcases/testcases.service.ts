
import { Injectable } from '@angular/core';

import { Testcase } from './testcase';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../environments/environment';

@Injectable()
export class TestcaseService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private TestcaseUrl = environment.api_url + '/test_cases';  // URL to web api

  constructor(private http: Http) { }

  getTestCases(): Promise<Testcase[]> {
    return this.http.get(this.TestcaseUrl)
               .toPromise()
               .then(response => response.json() as Testcase[])
               .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
