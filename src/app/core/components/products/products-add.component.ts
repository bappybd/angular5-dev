import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
    selector: 'app-products-add',
    templateUrl: 'products-add.component.html'
})
export class ProductsAddComponent implements OnInit, OnDestroy {
    public subProducts: Subscription;
    public products: Product[];
    public pagination: {
        currentPage: 1,
        perPage: 10,
        totalCount: 0,
        totalPages: 1,
    };

    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    dataSource = this.products;

    isLoggedIn: boolean;

    constructor(
        public productService: ProductService,
        public auth: AuthenticationService
    ) { }

    ngOnInit() {
        this.auth.loggedIn$
            .subscribe(isLoggedIn => {
                this.isLoggedIn = isLoggedIn;
                console.log(isLoggedIn);
            })
    }

    ngOnDestroy() {
        if (this.subProducts) {
            this.subProducts.unsubscribe();
        }
    }

}
