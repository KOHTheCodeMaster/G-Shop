import {Component} from '@angular/core';
import {CurrencyPipe, DatePipe, NgFor, NgIf} from "@angular/common";
import {Order} from "../../interface/Order";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../service/auth.service";

@Component({
    selector: 'app-view-order',
    standalone: true,
    imports: [CurrencyPipe, DatePipe, NgIf, NgFor],
    templateUrl: './view-order.component.html',
    styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent {

    order: Order | null = null;

    constructor(route: ActivatedRoute, authService: AuthService) {

        //  Get order id from URL Param
        let orderId = route.snapshot.params['orderId'];

        //  Get all orders from local storage
        let allOrders: { [key: number]: Order[] } = JSON.parse(localStorage.getItem('orders') || '{}');

        //  Initialize order for the current user by order id if it exists, otherwise set order to null
        this.order = allOrders[authService.getCurrentUserId()]?.find(order => order.id == orderId) || null;

    }

}
