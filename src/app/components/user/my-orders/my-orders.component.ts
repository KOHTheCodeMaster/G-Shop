import {Component} from '@angular/core';
import {Order} from '../../../interface/Order';
import {CurrencyPipe, DatePipe, NgFor, NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {AuthService} from "../../../service/auth.service";

@Component({
    selector: 'app-my-orders',
    standalone: true,
    templateUrl: './my-orders.component.html',
    imports: [CurrencyPipe, DatePipe, NgIf, NgFor],
    styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {

    allOrders: { [key: number]: Order[] };
    orders: Order[] = [];

    constructor(private router: Router, authService: AuthService) {
        this.allOrders = JSON.parse(localStorage.getItem('orders') || '{}');
        this.orders = this.allOrders[authService.getCurrentUserId()] || []; //  Get orders for the current user
    }

    viewOrderDetails(id: number) {
        this.router.navigate(['/user/my-orders', id]);
    }

}
