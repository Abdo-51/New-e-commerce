import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductsComponent } from './components/products/products.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CartComponent } from './components/cart/cart.component';
import { authGuard } from './core/guards/auth.guard';
import { unAuthGuard } from './core/guards/un-auth.guard';
import { ForgetPaswwordComponent } from './components/forget-password/forget-paswword.component';

export const routes: Routes = [
    {
        path: '', component:AuthLayoutComponent ,
        canActivate:[unAuthGuard],
         children: [
            {path: '', redirectTo:'signin', pathMatch:'full' },
            {path: 'signin', component: SigninComponent , title: 'signin'},
            {path: 'signup', component: SignupComponent  , title: 'signup'},
            {path: 'forgetpassword', component: ForgetPaswwordComponent  , title: 'forgetpassword'},
        ],
    },
    {
        path: '', component:MainLayoutComponent,
        canActivate:[authGuard],
        children: [
             {path: 'home', component: HomeComponent , title: 'home' },
            {path: 'products', component: ProductsComponent , title: 'products'},
            {path: 'product-details', component: ProductDetailsComponent , title: 'product-details'},
            {path: 'orders', component: OrdersComponent , title: 'orders'},
            {path: 'categories', component: CategoriesComponent , title: 'categories'},
            {path: 'brands', component: BrandsComponent , title: 'brands'},
            {path: 'cart', component: CartComponent , title: 'cart'},

        ],
    },
    {path: '**', component:NotFoundComponent , title: 'NotFound'}
];
