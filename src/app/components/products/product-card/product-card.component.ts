import {Component, Input} from '@angular/core';
import {CurrencyPipe} from "@angular/common";
import {Product} from "../../../interface/Product";
import {ShoppingCartService} from "../../../service/shopping-cart.service";

@Component({
    selector: 'app-product-card',
    standalone: true,
    imports: [CurrencyPipe],
    templateUrl: './product-card.component.html',
    styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

    @Input({required: true}) product: Product;

    constructor(private shoppingCartService: ShoppingCartService) {
        this.product = {id: 0, name: '', unitPrice: 0, category: '', imageUrl: ''}; // Initialize an empty product
    }

    addToCartBtnClick(product: Product) {
        this.shoppingCartService.addProductToCart(product);
    }

}
