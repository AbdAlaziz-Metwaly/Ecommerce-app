import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ChekoutComponent } from './pages/checkout/checkout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './core/guards/auth.guard';
import { loginGuard } from './core/guards/login.guard';
import { DetailsComponent } from '../app/components/details/details.component';
import { CartComponent } from './pages/cart/cart.component';
import { AllordersComponent } from './pages/allorders/allorders.component';
import { WishlistComponent } from './pages/Wishlist/wishlist.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [loginGuard],
    children: [
      {
        path: 'login',
        component: LoginComponent,
        title: 'Login',
      },
      {
        path: 'register',
        component: RegisterComponent,
        title: 'Register',
      },
      {
        path: 'forget',
        component: ForgetpasswordComponent,
        title: 'forget',
      },
    ],
  },

  {
    path: '',
    component: BlankLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
        title: 'Home',
      },
      {
        path: 'allorders',
        component: AllordersComponent,
        title: 'allorders',
      },
      {
        path: 'cart',
        component: CartComponent,
        title: 'Cart',
      },
      {
        path: 'products',
        component: ProductsComponent,
        title: 'Products',
      },
      {
        path: 'brands',
        component: BrandsComponent,
        title: 'Brands',
      },
      {
        path: 'Wishlist',
        component: WishlistComponent,
        title: 'Wishlist',
      },
      {
        path: 'categories',
        component: CategoriesComponent,
        title: 'catgories',
      },
      {
        path: 'checkout/:id',
        component: ChekoutComponent,
        title: 'Checkout',
      },

      {
        path: 'details/:id',
        component: DetailsComponent,
      },
    ],
  },

  { path: '**', component: NotfoundComponent },
];
