import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Observable} from "rxjs";
import {Product} from "../../../interface/Product";
import {ProductService} from "../../../service/product.service";
import {AsyncPipe, CurrencyPipe, NgFor, NgIf} from "@angular/common";

@Component({
    selector: 'app-manage-products',
    standalone: true,
    imports: [RouterLink, NgIf, NgFor, CurrencyPipe, AsyncPipe],
    templateUrl: './manage-products.component.html',
    styleUrl: './manage-products.component.css'
})
export class ManageProductsComponent {

    products$: Observable<Product[]> = new Observable<Product[]>();

    constructor(productService: ProductService) {
        this.products$ = productService.getProducts();
    }

}
