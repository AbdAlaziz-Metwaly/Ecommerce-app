import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  myToken = localStorage.getItem('userToken');
  constructor(private httpClient: HttpClient) {}
  addProductToWishlist(id: string): Observable<any> {
    return this.httpClient.post(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      {
        productId: id,
      }
    );
  }
  GetLoggedUserWishList(): Observable<any> {
    return this.httpClient.get(
      `https://ecommerce.routemisr.com/api/v1/wishlist`
    );
  }
  deleteWishListProduct(id: string): Observable<any> {
    return this.httpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`
    );
  }
}
