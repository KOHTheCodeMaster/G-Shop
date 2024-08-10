import {Component} from '@angular/core';
import {ProductService} from "../../service/product.service";
import {Product} from "../../interface/Product";
import {AsyncPipe, CurrencyPipe, NgFor} from "@angular/common";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {CategoryComponent} from "./category/category.component";
import {ProductCardComponent} from "./product-card/product-card.component";

@Component({
    selector: 'app-products',
    standalone: true,
    imports: [NgFor, AsyncPipe, CurrencyPipe, RouterLink, CategoryComponent, ProductCardComponent],
    templateUrl: './products.component.html',
    styleUrl: './products.component.css'
})
export class ProductsComponent {

    allProductsList: Product[];
    filteredProductsList: Product[];

    constructor(productService: ProductService, activatedRoute: ActivatedRoute) {

        this.filteredProductsList = this.allProductsList = [];  //  Initialize the products list

        //  Wait for 1 second to load the products from json file and then initialize the products$ observable
        setTimeout(() => productService.getAllProducts()
                .subscribe(products => this.filteredProductsList = this.allProductsList = products),
            1000);

        //  Filter the products based on the category selected
        activatedRoute.queryParamMap.subscribe(params => {
            let category: string | null = params.get('category');
            this.filteredProductsList = category
                ? this.allProductsList.filter(product => category === product.category)
                : this.allProductsList
        });

    }

}
