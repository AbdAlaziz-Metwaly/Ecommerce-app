import { CategoriesService } from './../../core/services/Categories/categories.service';
import { IProducts } from './../../shared/interfaces/iproducts';
import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/Products/products.service';
import { ICategories } from '../../shared/interfaces/icategories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../core/pipes/search/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/Wishlist/wishlist.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchPipe, CarouselModule, RouterLink, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly CategoriesService = inject(CategoriesService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly wishlistService = inject(WishlistService);

  products: IProducts[] = [];
  Categories: ICategories[] = [];
  searchText: string = '';

  customMainSlider: OwlOptions = {
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

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 6,
      },
    },
    nav: true,
  };
  ngOnInit(): void {
    this.getProductsData();
    this.getCategoriesData();
  }

  getProductsData(): void {
    this.productsService.getAllProducts().subscribe({
      next: (response) => {
        console.log(response.data);
        this.products = response.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getCategoriesData(): void {
    this.CategoriesService.getAllCategories().subscribe({
      next: (response) => {
        console.log(response.data);
        this.Categories = response.data;
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
