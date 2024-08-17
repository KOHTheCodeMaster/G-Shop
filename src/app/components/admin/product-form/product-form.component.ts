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

        //  If the route has a 'new' parameter, initialize an empty product
        if (this.activatedRoute.snapshot.paramMap.has('new')) this.product = productService.initializeEmptyProduct();

        //  If the route has a productId parameter, initialize the product by the id, else initialize an empty product
        const productId: string | null = this.activatedRoute.snapshot.paramMap.get('productId');
        this.product = productId
            ? this.productService.getProductById(productId) || productService.initializeEmptyProduct()
            : productService.initializeEmptyProduct();

    }

    save(formElement: any) {

        this.formSubmitAttempt = true;
        if (formElement.invalid) return;

        //  Update the product if it already exists, else create a new product
        if (this.product.id !== 0) this.productService.updateProduct(this.product);
        else this.productService.addProduct(formElement.value);

        this.router.navigate(['/admin/manage-products']);
    }

    deleteProductBtnClicked() {
        if (!confirm('Are you sure you want to delete this product?')) return;

        this.productService.deleteProductById(this.product.id);
        this.router.navigate(['/admin/manage-products']);
    }
}
