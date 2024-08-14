import {Component} from '@angular/core';
import {ShoppingCartService} from "../../service/shopping-cart.service";
import {CurrencyPipe, NgFor, NgIf} from "@angular/common";
import {Cart} from "../../interface/Cart";
import {Product} from "../../interface/Product";
import {Router} from "@angular/router";

@Component({
    selector: 'app-shopping-cart',
    standalone: true,
    imports: [CurrencyPipe, NgIf, NgFor],
    templateUrl: './shopping-cart.component.html',
    styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent {

    textContent: string = 'Shopping Cart';
    // cartList: Cart[];
    cart: Cart;

    constructor(private shoppingCartService: ShoppingCartService, private router: Router) {
        this.cart = shoppingCartService.getCart();
    }

    incrementQty(cartProduct: Product) {
        this.shoppingCartService.addProductToCart(cartProduct);
    }

    decrementQty(cartProduct: Product) {
        this.shoppingCartService.removeProductFromCart(cartProduct);
    }

    clearCartBtnClick() {
        this.shoppingCartService.removeAllProductsFromCart();
    }

    checkoutBtnClick() {
        this.router.navigate(['/checkout']);
    }

}
