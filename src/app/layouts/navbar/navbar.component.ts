import { AuthService } from './../../core/services/auth/auth.service';
import { Component, inject, input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  isLogin = input<boolean>(true);
  private readonly _AuthService = inject(AuthService);
  private readonly cartService = inject(CartService);

  countNumber: number = 0;

  ngOnInit(): void {
    this.cartService.getcart().subscribe({
      next: (res) => {
        console.log(res);
        this.cartService.cartNumber.next(res.numOfCartItems);
      },
    });

    this.cartService.cartNumber.subscribe({
      next: (count) => {
        this.countNumber = count;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  logout(): void {
    this._AuthService.logout();
  }
}
