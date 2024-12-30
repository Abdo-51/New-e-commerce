import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../environment/environment';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class CartService {
    headers = {
      token: localStorage.getItem('token')!
    }
    constructor(private _HttpClient:HttpClient) { }
  
    addProductToCart = (productId:string) : Observable<any> =>{
     return this._HttpClient.post(baseUrl + 'api/v1/cart' , {productId} , {
      headers: {
        ...this.headers
      } 
    })
  }

  updateProduct = (productId:string , count: number) : Observable<any> =>{
    return this._HttpClient.put(`${baseUrl}api/v1/cart/${productId}`, {count} , {
     headers: {
      ...this.headers
     } 
   })
 }

 removeItem = (productId:string ) : Observable<any> =>{
  return this._HttpClient.delete(`${baseUrl}api/v1/cart/${productId}`, {
   headers: {
    ...this.headers
   } 
 })
}

 clearCart = () : Observable<any> =>{
  return this._HttpClient.delete(`${baseUrl}api/v1/cart/`, {
   headers: {
    ...this.headers
   } 
 })
}

getLoggedUserCart = () : Observable<any> =>{
  return this._HttpClient.get(`${baseUrl}api/v1/cart/`, {
   headers: {
    ...this.headers
   } 
 })
}

}
  
