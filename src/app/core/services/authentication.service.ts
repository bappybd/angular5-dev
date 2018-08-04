import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthenticationService {


  // Observable
  loggedIn: boolean;
  loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);

  constructor(private http: HttpClient, private router: Router) {
    if (this.isLoggedIn()){
      this.setLoggedIn(true);
    } else {
        this.setLoggedIn(false);
    }
  }

  login(username: string, password: string) {
    var url = environment.apiUrl + '/users/login';
    /*let formData  = new FormData();
    formData.append('email', username);
    formData.append('password', password);*/

    const formData = new HttpParams()
        .set('email', username)
        .set('password', password)

    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    return this.http.post<any>(url , formData, options )
      .map(response => {
        let user: any = [];
        if (response.user) {
          user = response.user;

          // login successful if there's a jwt token in the response
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('frontend-token', user.token);

            this.setLoggedIn(true);
          }
        }

        return response;
      })
      /*.catch(this.handleError)*/;
  }

    public getProfile(): Observable<any>{
        const currentUser = localStorage.getItem('currentUser')
            ? JSON.parse(localStorage.getItem('currentUser')) : null;
        if (currentUser) {
            const token = currentUser.token;
            const url = environment.apiUrl + '/users/profile';
            const options = {
                headers: new HttpHeaders().set('Authorization', 'Token ' + token)
            };

            return this.http.get<any>(url, options)
                .map(response => {
                    return response;
                });
        }
    }

  setLoggedIn(value: boolean){
    this.loggedIn$.next(value);
    this.loggedIn = value;
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('frontend-token');

      this.setLoggedIn(false);
  }

  public getToken(): any {
    return localStorage.getItem('frontend-token');
  }

  private checkToken(): any {
    return !!localStorage.getItem('frontend-token');
  }

  setAuthKey(auth_key: any) {
    localStorage.setItem('frontend-token', auth_key);
  }

  public unauthorizedAccess(error: any): void {
    this.logout();
    this.router.navigate(['/user/login']);
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem('frontend-token') ? true : false;
  }

  public getUser() {
    const currentUser = localStorage.getItem('currentUser')
      ? JSON.parse(localStorage.getItem('currentUser')) : null;
    if (currentUser) {
      return currentUser.username;
    }
  }

  public getLoggedInUserDetails() {
    return localStorage.getItem('currentUser')
      ? JSON.parse(localStorage.getItem('currentUser')) : null;
  }

  private handleError(error: Response | any) {

    let errorMessage: any = {};
    // Connection error
    if (error.status === 0) {
      errorMessage = {
        success: false,
        status: 0,
        data: 'Sorry, there was a connection error occurred. Please try again.',
      };
    } else {
      errorMessage = error.json();
    }
    return Observable.throw(errorMessage);
  }
}
