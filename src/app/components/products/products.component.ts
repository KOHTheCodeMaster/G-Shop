import {Component} from '@angular/core';
import {ProductService} from "../../service/product.service";
import {Observable} from "rxjs";
import {Product} from "../../interface/Product";
import {AsyncPipe, CurrencyPipe, NgFor} from "@angular/common";
import {CategoryService} from "../../service/category.service";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-products',
    standalone: true,
    imports: [NgFor, AsyncPipe, CurrencyPipe, RouterLink],
    templateUrl: './products.component.html',
    styleUrl: './products.component.css'
})
export class ProductsComponent {

    products$: Observable<Product[]>;
    categories: string[];

    constructor(productService: ProductService, categoryService: CategoryService) {
        console.log('L0G - [products.component] - constructor invoked.');

        this.products$ = new Observable<Product[]>();
        this.categories = categoryService.getCategoryList();

        //  Wait for 1 second to load the products from json file and then initialize the products$ observable
        setTimeout(() => this.products$ = productService.getAllProducts(), 1000);

    }
}
