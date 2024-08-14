import {Component} from '@angular/core';
import {Order} from '../../../interface/Order';
import {CurrencyPipe, DatePipe, NgFor, NgIf} from "@angular/common";

@Component({
    selector: 'app-my-orders',
    standalone: true,
    templateUrl: './my-orders.component.html',
    imports: [CurrencyPipe, DatePipe, NgIf, NgFor],
    styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {

    orders: Order[] = [];

    constructor() {
        this.orders = JSON.parse(localStorage.getItem('orders') || '[]');
    }

    viewOrderDetails(id: number) {
        console.log('L0G - [my-orders.component] - viewOrderDetails() - Method Invoked.');
        console.log('L0G - viewOrderDetails() - Order ID: ' + id);
    }

}
