import { Injectable } from '@angular/core';
import { Category } from './category';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../environments/environment';

@Injectable()
export class CategoryService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private categoryUrl = environment.api_url + '/categories';  // URL to web api

  constructor(private http: Http) { }

  getCategories(): Promise<Category[]> {
    return this.http.get(this.categoryUrl)
               .toPromise()
               .then(response => response.json() as Category[])
               .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
