import {Component, Input} from '@angular/core';
import {Cart} from "../../../interface/Cart";
import {CurrencyPipe, NgFor} from "@angular/common";

@Component({
    selector: 'app-order-summary',
    standalone: true,
    imports: [CurrencyPipe, NgFor],
    templateUrl: './order-summary.component.html',
    styleUrl: './order-summary.component.css'
})
export class OrderSummaryComponent {

    @Input({required: true}) cart!: Cart;

}
