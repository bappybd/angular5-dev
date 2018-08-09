import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
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

  public createProducts(data): Observable<any> {
    const url = environment.apiUrl + '/products';
    const formData = new HttpParams()
      .set('title', data.title)
      .set('desc', data.desc)
      .set('price', data.price)

    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    return this.http.post<any>(url, formData, options)
      .map(response => {
        return response ;
      });
      /*.catch(this.handleError)*/;
  }

  private handleError(error: any, res) {
    const errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }


}
