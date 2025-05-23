import { routes } from './../../app.routes';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  isLoading: boolean = false;
  msgError: string = '';
  success: string = '';

  login: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z]\w{7,}$/),
    ]),
  });

  Submitform(): void {
    if (this.login.valid) {
      this.isLoading = true;
      this.authService.sendLogin(this.login.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === `success`) {
            setTimeout(() => {
              localStorage.setItem('token', res.token);
              this.authService.saveUserData();
              this.router.navigate([`/home`]);
            }, 500);
            this.success = res.message;
          }
          this.isLoading = false;
        },
        error: (err: HttpErrorResponse) => {
          this.msgError = err.error.message;
          console.log(err);

          this.isLoading = false;
        },
      });
    }
  }
}
