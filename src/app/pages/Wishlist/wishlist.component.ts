import { ToastrService } from 'ngx-toastr';

import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/Wishlist/wishlist.service';
import { Iwishlist } from '../../shared/interfaces/iwishlist';
import { CartService } from '../../core/services/cart/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wishlist',
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent implements OnInit {
  private readonly wishlistService = inject(WishlistService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  wishListData: Iwishlist[] = [];
  ngOnInit(): void {
    this.getWishListData();
  }
  getWishListData(): void {
    this.wishlistService.GetLoggedUserWishList().subscribe({
      next: (res) => {
        this.wishListData = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  removeItemwishlist(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.wishlistService.deleteWishListProduct(id).subscribe({
          next: (res) => {
            console.log(res.data);
            this.wishListData = res.data;
            this.toastrService.success(res.message, res.status);
            this.getWishListData();
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success',
            });
          },
          error: (error) => {
            console.error(error);
          },
        });
      }
    });
  }
  addtocard(id: string): void {
    this.cartService.addporducttocart(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          this.toastrService.success(res.message, res.status);
          this.removeItemwishlist(id);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
