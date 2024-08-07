import {Component} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {CategoryService} from "../../../service/category.service";
import {CurrencyPipe, NgFor, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ProductService} from "../../../service/product.service";

@Component({
    selector: 'app-product-form',
    standalone: true,
    imports: [RouterLink, NgFor, NgIf, FormsModule, CurrencyPipe],
    templateUrl: './product-form.component.html',
    styleUrl: './product-form.component.css'
})
export class ProductFormComponent {

    categoryList: string[];
    formSubmitAttempt: boolean = false;

    constructor(categoryService: CategoryService, private productService: ProductService, private router: Router) {
        this.categoryList = categoryService.getCategoryList();
    }

    save(formElement: any) {

        this.formSubmitAttempt = true;
        if (formElement.invalid) return;

        this.productService.createProduct(formElement.value).subscribe( response => {
            console.log('Product created successfully.');
            console.log(response);
        });

        this.router.navigate(['/admin/manage-products']);
    }

}
