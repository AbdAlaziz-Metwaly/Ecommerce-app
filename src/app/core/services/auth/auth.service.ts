import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any = null;

  private readonly _HttpClient = inject(HttpClient);
  private readonly _Router = inject(Router);

  sendRequest(data: object): Observable<any> {
    return this._HttpClient.post(`${environment.url}/api/v1/auth/signup`, data);
  }
  sendLogin(data: object): Observable<any> {
    return this._HttpClient.post(`${environment.url}/api/v1/auth/signin`, data);
  }

  saveUserData(): void {
    if (localStorage.getItem('token') !== null) {
      this.userData = jwtDecode(localStorage.getItem('token')!);
      console.log(`data`, this.userData);
    }
  }

  logout(): void {
    localStorage.removeItem('token');

    this.userData = null;
    this._Router.navigate(['/login']);
  }
  setEmailVerify(data: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.url}/api/v1/auth/forgotPasswords`,
      data
    );
  }
  setCodeVerify(data: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.url}/api/v1/auth/verifyResetCode`,
      data
    );
  }
  setResetPassword(data: object): Observable<any> {
    return this._HttpClient.put(
      `${environment.url}/api/v1/auth/resetPassword`,
      data
    );
  }
}
