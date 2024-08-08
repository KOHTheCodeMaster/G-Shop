import {Component, OnDestroy} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Product} from "../../../interface/Product";
import {ProductService} from "../../../service/product.service";
import {AsyncPipe, CurrencyPipe, NgFor, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-manage-products',
    standalone: true,
    imports: [RouterLink, NgIf, NgFor, CurrencyPipe, AsyncPipe, FormsModule],
    templateUrl: './manage-products.component.html',
    styleUrl: './manage-products.component.css'
})
export class ManageProductsComponent implements OnDestroy {

    allProductsList: Product[] = [];
    filteredProductsList: Product[] = [];
    private subscription: Subscription;

    constructor(private productService: ProductService) {
        this.subscription = this.productService.getAllProducts()
            .subscribe(products => this.filteredProductsList = this.allProductsList = products);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    deleteProductBtnClicked(productId: number) {
        if (!confirm('Are you sure you want to delete this product?')) return;

        // Delete the product from the Local Storage
        this.productService.deleteProductById(productId);

        // Remove the deleted product from allProductsList & filteredProductsList
        this.allProductsList = this.allProductsList.filter(product => product.id !== productId);
        this.filteredProductsList = this.filteredProductsList.filter(product => product.id !== productId);
    }

    searchProductsInputChangeListener(eventTarget: EventTarget | null) {
        if (!eventTarget) return;

        const query: string = (eventTarget as HTMLInputElement).value.toLowerCase();
        this.filteredProductsList = query
            ? this.allProductsList.filter(product => product.name.toLowerCase().includes(query))
            : this.allProductsList;
    }

}
