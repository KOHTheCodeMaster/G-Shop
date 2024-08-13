import {Component} from '@angular/core';
import {CurrencyPipe, NgFor, NgIf} from "@angular/common";
import {Cart} from "../../interface/Cart";
import {ShoppingCartService} from "../../service/shopping-cart.service";
import {DeliveryFormComponent} from "./delivery-form/delivery-form.component";
import {OrderSummaryComponent} from "./order-summary/order-summary.component";

@Component({
    selector: 'app-checkout',
    standalone: true,
    imports: [CurrencyPipe, NgIf, NgFor, DeliveryFormComponent, OrderSummaryComponent],
    templateUrl: './checkout.component.html',
    styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

    cart: Cart;

    constructor(shoppingCartService: ShoppingCartService) {
        this.cart = shoppingCartService.cartList[0];
    }

}
