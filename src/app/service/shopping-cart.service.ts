import {Injectable} from '@angular/core';
import {Product} from "../interface/Product";
import {Cart} from "../interface/Cart";

@Injectable({
    providedIn: 'root'
})
export class ShoppingCartService {

    cartList: Cart[] = [];
    cartProductList: Product[];
    private keyShoppingCart: string = 'shopping-cart';

    constructor() {

        let strTempEmptyCartList: string = JSON.stringify([this.getEmptyCartForGuestUser()]);   //  Create a temporary empty cart list

        //  Initialize carts list
        //  Get the stored carts from local storage
        let storedCarts: string | null = localStorage.getItem(this.keyShoppingCart);
        this.cartList = JSON.parse(storedCarts || strTempEmptyCartList); //  Initialize the carts list
        //  Update local storage with an empty carts list if not already present
        if (!storedCarts) localStorage.setItem(this.keyShoppingCart, strTempEmptyCartList);

        //  Initialize the cart products list using the first cart in the carts list
        this.cartProductList = this.cartList[0].products;

    }

    private getEmptyCartForGuestUser(): Cart {
        return {
            id: 0,
            user: {id: 101, username: 'guest', email: 'guest@abc.xyz', password: 'guest', admin: false},
            products: [],
            totalPrice: 0,
            totalQty: 0
        }
    }

    addProductToCart(product: Product) {

        this.cartProductList.push(product);    //  Add the product to the cart products list
        //  This is not required as the cartProductList is a reference to the first cart's products list
        // this.cartList[0].products = this.cartProductList;

        //  Update the local storage with the updated cart list
        localStorage.setItem(this.keyShoppingCart, JSON.stringify(this.cartList));

    }

    public getCartList(): Cart[] {
        return this.cartList;
    }

}
