import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialAppModule } from './ngmaterial/ngmaterial.module';
import { CoreModule } from './core/core.module';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';

// Routing Module
import { AppRouting } from './app-routing.module';

// Custom Directives
import { HighlightDirective } from './core/directives/highlight.directive';

// Custom components
import { HeaderComponent } from './core/components/header/header.component';
import { AlertComponent } from './core/components/alert/alert.component';
import { ProductsComponent } from './core/components/products/products.component';
import { ProductsAddComponent } from './core/components/products/products-add.component';
import { P404Component } from './core/components/404/404.component';
import { HomeComponent } from './core/components/home/home.component';
import { UserComponent } from './core/components/user/user.component';
import { UserLoginComponent } from './core/components/user/user-login.component';
import { UserLogoutComponent } from './core/components/user/user-logout.component';
import { UserSignupComponent } from './core/components/user/user-signup.component';


@NgModule({
  declarations: [
    HighlightDirective,

    AppComponent,
    HeaderComponent,
    AlertComponent,
    ProductsComponent,
    ProductsAddComponent,
    HomeComponent,
    UserComponent,
    UserLoginComponent,
    UserLogoutComponent,
    UserSignupComponent,
    P404Component
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, MaterialAppModule, CoreModule, NgxPaginationModule, AppRouting
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
