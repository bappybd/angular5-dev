import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Product } from '../models/product';

@Injectable()
export class ProductService {

  private apiUrl = environment.apiUrl;
  private urlProducts = this.apiUrl + '/products/search';

  constructor(public http: HttpClient) {
  }

  public getProducts(data): Observable<any> {
      let params = new HttpParams();
      params = params.append('page', data.page);

    return this.http.get<any>(this.urlProducts, {params: params})
        .map(response => {
          return {
            data: response.data.map(product => {
                return new Product(product);
            }),
              'pagination': response.pagination
          } ;
        })
        /*.catch(this.handleError)*/;
  }

  private handleError(error: any, res) {
    const errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }


}
