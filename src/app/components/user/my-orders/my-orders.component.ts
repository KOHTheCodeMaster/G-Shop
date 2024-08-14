import {Component} from '@angular/core';
import {Order} from '../../../interface/Order';
import {CurrencyPipe, DatePipe, NgFor, NgIf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
    selector: 'app-my-orders',
    standalone: true,
    templateUrl: './my-orders.component.html',
    imports: [CurrencyPipe, DatePipe, NgIf, NgFor],
    styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {

    orders: Order[] = [];

    constructor(private router: Router) {
        this.orders = JSON.parse(localStorage.getItem('orders') || '[]');
    }

    viewOrderDetails(id: number) {
        this.router.navigate(['/user/my-orders', id]);
    }

}
