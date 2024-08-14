import {Component} from '@angular/core';
import {CurrencyPipe, DatePipe, NgFor, NgIf} from "@angular/common";
import {Order} from "../../interface/Order";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-view-order',
    standalone: true,
    imports: [CurrencyPipe, DatePipe, NgIf, NgFor],
    templateUrl: './view-order.component.html',
    styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent {

    order: Order | null;

    constructor(route: ActivatedRoute) {

        //  Get order id from URL Param
        let orderId = route.snapshot.params['orderId'];

        //  Find order by id from orders array if exists, else set order to null
        let orders: Order[] = JSON.parse(localStorage.getItem('orders') || '[]');
        this.order = orders.find(order => order.id == orderId) || null;

    }

}
