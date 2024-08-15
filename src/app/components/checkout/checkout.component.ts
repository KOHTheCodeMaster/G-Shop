import {Component} from '@angular/core';
import {CurrencyPipe, NgFor, NgIf} from "@angular/common";
import {Cart} from "../../interface/Cart";
import {ShoppingCartService} from "../../service/shopping-cart.service";
import {DeliveryFormComponent} from "./delivery-form/delivery-form.component";
import {OrderSummaryComponent} from "./order-summary/order-summary.component";
import {Order} from "../../interface/Order";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {DeliveryFormData} from "../../interface/DeliveryFormData";
import {AuthService} from "../../service/auth.service";

@Component({
    selector: 'app-checkout',
    standalone: true,
    imports: [CurrencyPipe, NgIf, NgFor, DeliveryFormComponent, OrderSummaryComponent, FormsModule],
    templateUrl: './checkout.component.html',
    styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

    cart: Cart;
    order: Order;
    orderIdCounter: number;

    constructor(private shoppingCartService: ShoppingCartService, private router: Router, private authService: AuthService) {
        this.cart = shoppingCartService.getCartForCurrentUser();
        this.orderIdCounter = JSON.parse(localStorage.getItem('orders') || '[]').length + 1;
        this.order = this.createDummyOrder();
    }

    placeOrder() {
        const userId = this.authService.getCurrentUserId();
        let allOrders: { [key: number]: Order[] } = JSON.parse(localStorage.getItem('orders') || '{}');

        //  If user doesn't have any orders, create an empty array for the current user
        if (!allOrders[userId]) allOrders[userId] = [];

        //  Add current order to the allOrders array for the current user & save to local storage
        allOrders[userId].push({...this.order, cart: this.cart});
        localStorage.setItem('orders', JSON.stringify(allOrders));

        this.shoppingCartService.removeAllProductsFromCart();   //  Clear Current User Cart

        this.router.navigate(['/user/my-orders']);  //  Redirect to my-orders page

    }

    updateDeliveryFormData(deliveryFormData: DeliveryFormData) {
        this.order.deliveryFormData = deliveryFormData;
    }

    createDummyOrder(): Order {
        return {
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
    }

}
