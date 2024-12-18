import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient: HttpClient) { }

  signUp = (user:any) :Observable<any> => {
    return this._HttpClient.post(baseUrl + 'api/v1/auth/signup', user)
  }

  signIn = (user:any):Observable<any> => {
    return this._HttpClient.post(baseUrl + 'api/v1/auth/signin', user)
  }
}
