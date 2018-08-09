import { ModuleWithProviders, NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { P404Component } from './core/components/404/404.component';
import { HomeComponent } from './core/components/home/home.component';
import { ProductsComponent } from './core/components/products/products.component';
import { ProductsAddComponent } from './core/components/products/products-add.component';
import { UserComponent } from './core/components/user/user.component';
import { UserLoginComponent } from './core/components/user/user-login.component';
import { UserLogoutComponent } from './core/components/user/user-logout.component';
import { UserSignupComponent } from './core/components/user/user-signup.component';

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'products', component: ProductsComponent},
  { path: 'products/add', component: ProductsAddComponent, canActivate: [AuthGuard]},
  { path: 'user', component: UserComponent, canActivate: [AuthGuard]},
    { path: 'user/login', component: UserLoginComponent},
    { path: 'user/logout', component: UserLogoutComponent},
    { path: 'user/signup', component: UserSignupComponent},
  /*{ path: 'user', loadChildren: './user/user.module#UserModule'},*/
  /*{ path: 'orders', loadChildren: './order/order.module#OrderModule'},*/
  // Error controller
  { path: '**', component: P404Component }
];


export const AppRouting: ModuleWithProviders = RouterModule.forRoot(routes);
