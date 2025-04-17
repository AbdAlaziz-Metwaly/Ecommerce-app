import { CartService } from './../../core/services/cart/cart.service';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/Products/products.service';
import { IProducts } from '../../shared/interfaces/iproducts';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/Wishlist/wishlist.service';

@Component({
  selector: 'app-details',
  imports: [CarouselModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  addToCart: any;

  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);
  private readonly toastrService = inject(ToastrService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);

  detailsproducts: IProducts | null = null;

  customDetailsSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplayHoverPause: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: true,
  };

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        let idProduct = params.get('id');

        this._ProductsService.getspecificProducts(idProduct!).subscribe({
          next: (res) => {
            console.log(res.data);
            this.detailsproducts = res.data;
          },
          error: (error) => {
            console.error(error);
          },
        });
      },
    });
  }
  addtocard(id: string): void {
    this.cartService.addporducttocart(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          this.toastrService.success(res.message, res.status);
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
