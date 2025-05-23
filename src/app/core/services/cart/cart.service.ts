import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private httpClient: HttpClient) {}

  cartNumber: BehaviorSubject<number> = new BehaviorSubject(0);

  addporducttocart(id: string): Observable<any> {
    return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/cart', {
      productId: id,
    });
  }

  getcart(): Observable<any> {
    return this.httpClient.get('https://ecommerce.routemisr.com/api/v1/cart');
  }

  removeItemCart(id: string): Observable<any> {
    return this.httpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`
    );
  }

  updateCartItem(id: string, count: number): Observable<any> {
    return this.httpClient.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      { count }
    );
  }

  clearCart(): Observable<any> {
    return this.httpClient.delete(
      'https://ecommerce.routemisr.com/api/v1/cart'
    );
  }
}
