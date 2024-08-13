import {Component} from '@angular/core';
import {CurrencyPipe, NgFor, NgIf} from "@angular/common";
import {Cart} from "../../interface/Cart";
import {ShoppingCartService} from "../../service/shopping-cart.service";
import {DeliveryFormComponent} from "./delivery-form/delivery-form.component";
import {OrderSummaryComponent} from "./order-summary/order-summary.component";
import {Order} from "../../interface/Order";
import {Router} from "@angular/router";

@Component({
    selector: 'app-checkout',
    standalone: true,
    imports: [CurrencyPipe, NgIf, NgFor, DeliveryFormComponent, OrderSummaryComponent],
    templateUrl: './checkout.component.html',
    styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

    cart: Cart;
    orderIdCounter: number = 1;

    constructor(shoppingCartService: ShoppingCartService, private router: Router) {
        this.cart = shoppingCartService.cartList[0];
    }

    confirmOrder() {

        //  Create a Dummy Order

        const order: Order = {
            id: this.orderIdCounter++,
            cart: this.cart,
            deliveryFormData: {
                name: 'Mr. Champak',
                address: 'Pratap Nagar',
                city: 'Jaipur',
                state: 'Rajasthan',
                zip: '123456'
            },
            orderDate: new Date()
        };

        // Save order to localStorage or a service
        let orders: Order[] = JSON.parse(localStorage.getItem('orders') || '[]');
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));

        // Navigate to My Orders page
        this.router.navigate(['/user/my-orders']);

    }

}
