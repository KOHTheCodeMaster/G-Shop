import {Component} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {CategoryService} from "../../../service/category.service";
import {CurrencyPipe, NgFor, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ProductService} from "../../../service/product.service";
import {Product} from "../../../interface/Product";

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
    product: Product;

    constructor(categoryService: CategoryService,
                private productService: ProductService,
                private activatedRoute: ActivatedRoute,
                private router: Router) {

        this.categoryList = categoryService.getCategoryList();

        //  Reset product for new product creation
        if (this.activatedRoute.snapshot.paramMap.has('new')) this.product = this.initializeEmptyProduct();

        const productId: string | null = this.activatedRoute.snapshot.paramMap.get('productId');
        this.product = productId
            ? this.productService.getProductById(productId) || this.initializeEmptyProduct()
            : this.initializeEmptyProduct();

    }

    initializeEmptyProduct(): Product {
        return {id: 0, name: '', unitPrice: 0, category: '', imageUrl: ''}; // Initialize an empty product
    }

    save(formElement: any) {

        this.formSubmitAttempt = true;
        if (formElement.invalid) return;

        //  Update the product if it already exists, else create a new product
        if (this.product.id !== 0) this.productService.updateProduct(this.product);
        else {
            this.productService.addProduct(formElement.value).subscribe(productCreated => {
                console.log('Product created successfully.');
                console.log(JSON.stringify(productCreated));
            });
        }

        this.router.navigate(['/admin/manage-products']);
    }

    deleteProductBtnClicked() {
        if (!confirm('Are you sure you want to delete this product?')) return;

        this.productService.deleteProductById(this.product.id);
        this.router.navigate(['/admin/manage-products']);
    }
}
