import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}
  getAllProducts(): Observable<any> {
    return this.httpClient.get(`${environment.url}/api/v1/products`);
  }
  getspecificProducts(id: string): Observable<any> {
    return this.httpClient.get(`${environment.url}/api/v1/products/${id}`);
  }
}
