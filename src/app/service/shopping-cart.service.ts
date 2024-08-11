import {Injectable} from '@angular/core';
import {Product} from "../interface/Product";

@Injectable({
    providedIn: 'root'
})
export class ShoppingCartService {

    cartProductsList: Product[];
    private keyShoppingCartProducts: string = 'shopping-cart-products';

    constructor() {

        //  Get the stored cart products from local storage
        let storedCartProducts: string | null = localStorage.getItem(this.keyShoppingCartProducts);
        this.cartProductsList = JSON.parse(storedCartProducts || '[]'); //  Initialize the cart products list

        //  Update local storage with an empty cart products list if not already present
        if (!storedCartProducts) localStorage.setItem(this.keyShoppingCartProducts, '[]');

    }

    addProductToCart(product: Product) {

        this.cartProductsList.push(product);    //  Add the product to the cart products list

        //  Update the local storage with the updated cart products list
        localStorage.setItem(this.keyShoppingCartProducts, JSON.stringify(this.cartProductsList));

    }

}
