import { Injectable } from '@angular/core';

import { Testscript } from './testscript';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../environments/environment';

@Injectable()
export class TestscriptService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private TestscriptUrl = environment.api_url + '/test_scripts';  // URL to web api

  constructor(private http: Http) { }

  getTestScripts(): Promise<Testscript[]> {
    return this.http.get(this.TestscriptUrl)
               .toPromise()
               .then(response => response.json() as Testscript[])
               .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
