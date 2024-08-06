import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {CategoryService} from "../../../service/category.service";
import {NgFor} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ProductService} from "../../../service/product.service";

@Component({
    selector: 'app-product-form',
    standalone: true,
    imports: [RouterLink, NgFor, FormsModule],
    templateUrl: './product-form.component.html',
    styleUrl: './product-form.component.css'
})
export class ProductFormComponent {

    categoryList: string[];

    constructor(categoryService: CategoryService, private productService: ProductService) {
        this.categoryList = categoryService.getCategoryList();
    }

    save(productFormValue: any) {

        console.log('productFormValue: ' + productFormValue);
        console.log('productFormValue (JSON): ' + JSON.stringify(productFormValue));

        this.productService.createProduct(productFormValue).subscribe( response => {
            console.log('Product created successfully.');
            console.log(response);
        });
    }
}
