import {Component, Input, OnInit} from '@angular/core';
import {CurrencyPipe, NgIf} from "@angular/common";
import {Product} from "../../../interface/Product";
import {ShoppingCartService} from "../../../service/shopping-cart.service";

@Component({
    selector: 'app-product-card',
    standalone: true,
    imports: [CurrencyPipe, NgIf],
    templateUrl: './product-card.component.html',
    styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit {

    @Input({required: true}) product: Product;
    productQuantity: number = 0;

    constructor(private shoppingCartService: ShoppingCartService) {
        this.product = {id: 0, name: '', unitPrice: 0, category: '', imageUrl: ''}; // Initialize an empty product

        //  Whenever cart is updated, update the product quantity
        this.shoppingCartService.cartUpdated.subscribe(() => {
            this.productQuantity = this.shoppingCartService.getProductQuantity(this.product.id);
        });
    }

    ngOnInit(): void {
        this.productQuantity = this.shoppingCartService.getProductQuantity(this.product.id);
    }

    addProductToCart(product: Product) {
        this.productQuantity += 1;
        this.shoppingCartService.addProductToCart(product);
    }

    incrementQuantity(product: Product) {
        this.addProductToCart(product);
    }

    decrementQuantity(product: Product) {
        if (this.productQuantity > 0) {
            this.productQuantity -= 1;
            // Logic to remove product from cart or update quantity in cart
            this.shoppingCartService.removeProductFromCart(product);
        }
    }

}
