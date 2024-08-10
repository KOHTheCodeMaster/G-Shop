import {Component, Input} from '@angular/core';
import {CurrencyPipe, NgForOf} from "@angular/common";
import {Product} from "../../../interface/Product";

@Component({
    selector: 'app-product-card',
    standalone: true,
    imports: [
        CurrencyPipe,
        NgForOf
    ],
    templateUrl: './product-card.component.html',
    styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

    @Input({required: true}) product: Product;

    constructor() {
        this.product = {id: 0, name: '', price: 0, category: '', imageUrl: ''}; // Initialize an empty product
    }

}
