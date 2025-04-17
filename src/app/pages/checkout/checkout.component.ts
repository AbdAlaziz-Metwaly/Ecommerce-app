import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders/orders.service';

@Component({
  selector: 'app-chekout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class ChekoutComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly OrdersService = inject(OrdersService);
  checkOutForm!: FormGroup;
  cartId: string = '';

  ngOnInit(): void {
    this.initform();
    this.getCartId();
  }
  initform(): void {
    this.checkOutForm = this.formBuilder.group({
      details: [null, Validators.required],
      phone: [
        null,
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
      ],
      city: [null, Validators.required],
    });
  }
  getCartId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (param) => {
        this.cartId = param.get('id')!;
        console.log(this.cartId);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  submitForm(): void {
    this.cartId;
    this.OrdersService.CheckoutSession(
      this.cartId,
      this.checkOutForm.value
    ).subscribe({
      next: (response) => {
        console.log(response);
        open(response.session.url, '_self');
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
