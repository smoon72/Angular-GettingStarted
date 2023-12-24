import { Injectable } from '@angular/core';
import { IProduct } from './product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EMPTY, Observable, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl = 'api/products/products.json'

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productUrl).pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(err => {
        return EMPTY;
      })
    );
  }

  constructor(private http: HttpClient) { }

}
