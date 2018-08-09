import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthGuard } from '../auth.guard';
import { AuthenticationService } from './services/authentication.service';
import { ProductService } from './services/product.service';
import { AlertService } from './services/alert.service';

// Components


@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule

    ],
    declarations: [
        /*TemplateCustomVarDirective*/
    ],
    exports: [
        /*TemplateCustomVarDirective,*/
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        AuthGuard,
        AuthenticationService,
        ProductService,
        AlertService
    ]
})
export class CoreModule {
}
