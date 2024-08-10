import {Component} from '@angular/core';
import {ProductService} from "../../service/product.service";
import {Product} from "../../interface/Product";
import {AsyncPipe, CurrencyPipe, NgFor} from "@angular/common";
import {CategoryService} from "../../service/category.service";
import {ActivatedRoute, RouterLink} from "@angular/router";

@Component({
    selector: 'app-products',
    standalone: true,
    imports: [NgFor, AsyncPipe, CurrencyPipe, RouterLink],
    templateUrl: './products.component.html',
    styleUrl: './products.component.css'
})
export class ProductsComponent {

    allProductsList: Product[];
    filteredProductsList: Product[];
    categories: string[];

    constructor(productService: ProductService, categoryService: CategoryService, activatedRoute: ActivatedRoute) {

        this.filteredProductsList = this.allProductsList = [];
        this.categories = categoryService.getCategoryList();

        //  Wait for 1 second to load the products from json file and then initialize the products$ observable
        setTimeout(() => productService.getAllProducts()
                .subscribe(products => this.filteredProductsList = this.allProductsList = products),
            1000);

        activatedRoute.queryParamMap.subscribe(params => {
            let category = params.get('category');
            this.filteredProductsList = category
                ? this.allProductsList.filter(product => category === product.category)
                : this.allProductsList
        });

    }

}
