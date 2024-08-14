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

    constructor(private shoppingCartService: ShoppingCartService, private router: Router) {
        this.cart = shoppingCartService.cartList[0];
        this.orderIdCounter = JSON.parse(localStorage.getItem('orders') || '[]').length + 1;
        this.order = this.createDummyOrder();
    }

    placeOrder() {
        //  Save order to localStorage
        let orders: Order[] = JSON.parse(localStorage.getItem('orders') || '[]');
        orders.push(this.order);
        localStorage.setItem('orders', JSON.stringify(orders));

        //  Clear Cart & reset local storage
        this.shoppingCartService.removeAllProductsFromCart();
        this.cart = this.shoppingCartService.getCartList()[0];

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
