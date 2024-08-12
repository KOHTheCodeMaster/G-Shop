import {Component} from '@angular/core';
import {ShoppingCartService} from "../../service/shopping-cart.service";
import {CurrencyPipe, NgFor, NgIf} from "@angular/common";
import {Cart} from "../../interface/Cart";
import {Product} from "../../interface/Product";

@Component({
    selector: 'app-shopping-cart',
    standalone: true,
    imports: [CurrencyPipe, NgIf, NgFor],
    templateUrl: './shopping-cart.component.html',
    styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent {

    textContent: string = 'Shopping Cart';
    cartList: Cart[];

    constructor(private shoppingCartService: ShoppingCartService) {
        this.cartList = shoppingCartService.getCartList();
    }

    incrementQty(cartProduct: Product) {
        this.shoppingCartService.addProductToCart(cartProduct);
    }

    decrementQty(cartProduct: Product) {
        this.shoppingCartService.removeProductFromCart(cartProduct);
    }

    removeAllBtnClick() {
        this.shoppingCartService.removeAllProductsFromCart();
    }

}
