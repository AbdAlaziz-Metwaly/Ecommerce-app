import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { Icart } from '../../shared/interfaces/icart';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);

  cartDetails: Icart = {} as Icart;
  ngOnInit(): void {
    this.getCartData();
  }

  getCartData(): void {
    this.cartService.getcart().subscribe({
      next: (res) => {
        console.log(res.data);
        this.cartDetails = res.data;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  removeItem(id: string): void {
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
        this.cartService.removeItemCart(id).subscribe({
          next: (res) => {
            console.log(res.data);
            this.cartDetails = res.data;
            this.cartService.cartNumber.next(res.numOfCartItems);

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

  upbataCount(id: string, count: number): void {
    this.cartService.updateCartItem(id, count).subscribe({
      next: (res) => {
        console.log(res.data);
        this.cartDetails = res.data;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  clearCartHandler(): void {
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
        this.cartService.clearCart().subscribe({
          next: (res) => {
            console.log(res.data);
            this.cartDetails = {} as Icart;
            this.cartService.cartNumber.next(0);

            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success',
            });
          },
          error: (err) => {
            console.error(err);
          },
        });
      }
    });
  }
}
