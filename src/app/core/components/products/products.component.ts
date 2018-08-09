import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { FormControl } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
    selector: 'app-products',
    templateUrl: 'products.component.html'
})
export class ProductsComponent implements OnInit, OnDestroy {
    public term = new FormControl();
    public subProducts: Subscription;
    public products: Product[];
    public pagination: {
        currentPage: 1,
        perPage: 10,
        totalCount: 0,
        totalPages: 1,
    };

    public currentPage = 1;

    // MatPaginator Output
    pageEvent: PageEvent;

    displayedColumns: string[] = ['id', 'title'];
    dataSource = this.products;

    constructor(public productService: ProductService) { }

    ngOnInit() {
        const params = {page: this.currentPage, q: this.term.value};
        this.getProducts(params);

        // Bind action for the search filter field
        this.term.valueChanges
          .debounceTime(400)
          .distinctUntilChanged()
          .subscribe(searchTerm => {
            this.getProducts({q: this.term.value});
          });
    }

    ngOnDestroy() {
        this.subProducts.unsubscribe();
    }

    getProducts(params) {
        this.subProducts = this.productService.getProducts(params)
            .subscribe((res) => {
               this.products = res.data;
                this.dataSource = this.products;

               this.pagination = res.pagination;
               console.log(this.products);
               console.log(this.pagination);

               this.currentPage = this.pagination.currentPage;
            });
    }

    goToPage(pageEvent) {
         console.log(pageEvent);
        const params = {page: pageEvent ? pageEvent.pageIndex + 1 : 1};
        this.getProducts(params);
    }

}
