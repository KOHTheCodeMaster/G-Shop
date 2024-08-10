import {Component} from '@angular/core';
import {ProductService} from "../../service/product.service";
import {Observable} from "rxjs";
import {Product} from "../../interface/Product";
import {AsyncPipe, CurrencyPipe, NgFor} from "@angular/common";

@Component({
    selector: 'app-products',
    standalone: true,
    imports: [NgFor, AsyncPipe, CurrencyPipe],
    templateUrl: './products.component.html',
    styleUrl: './products.component.css'
})
export class ProductsComponent {

    products$: Observable<Product[]>;

    constructor(productService: ProductService) {
        console.log('L0G - [products.component] - constructor invoked.');

        this.products$ = new Observable<Product[]>();

        //  Wait for 1 second to load the products from json file and then initialize the products$ observable
        setTimeout(() => this.products$ = productService.getAllProducts(), 1000);

    }
}
