import { IProducts } from './../../shared/interfaces/iproducts';
import { Component, inject, OnInit } from '@angular/core';
import { CartService } from './../../core/services/cart/cart.service';
import { ProductsService } from '../../core/services/Products/products.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../core/pipes/search/search.pipe';
import { FormsModule } from '@angular/forms';
import { WishlistService } from '../../core/services/Wishlist/wishlist.service';

@Component({
  selector: 'app-products',
  imports: [RouterLink, SearchPipe, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly wishlistService = inject(WishlistService);
  products: IProducts[] = [];
  searchText: string = '';

  ngOnInit(): void {
    this.getProductData();
  }

  getProductData(): void {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  addtocard(id: string): void {
    this.cartService.addporducttocart(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          this.toastrService.success(res.message, res.status);
          this.cartService.cartNumber.next(res.numOfCartItems);
          console.log(this.cartService.cartNumber);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  addToWishList(id: string): void {
    this.wishlistService.addProductToWishlist(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toastrService.success(res.message);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
