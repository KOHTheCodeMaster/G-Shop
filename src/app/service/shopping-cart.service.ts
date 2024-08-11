import {Injectable} from '@angular/core';
import {Product} from "../interface/Product";
import {Cart} from "../interface/Cart";
import {CartProduct} from "../interface/CartProduct";

@Injectable({
    providedIn: 'root'
})
export class ShoppingCartService {

    cartList: Cart[] = [];
    cartProductList: CartProduct[];
    private keyShoppingCart: string = 'shopping-cart';

    constructor() {

        //  Create a temporary empty cart list
        let strTempEmptyCartList: string = JSON.stringify([this.getEmptyCartForGuestUser()]);

        //  Initialize carts list
        //  Get the stored carts from local storage
        let storedCarts: string | null = localStorage.getItem(this.keyShoppingCart);
        this.cartList = JSON.parse(storedCarts || strTempEmptyCartList); //  Initialize the carts list
        //  Update local storage with an empty carts list if not already present
        if (!storedCarts) localStorage.setItem(this.keyShoppingCart, strTempEmptyCartList);

        //  Initialize the cart products list using the first cart in the carts list
        this.cartProductList = this.cartList[0].cartProducts;

    }

    private getEmptyCartForGuestUser(): Cart {
        return {
            id: 0,
            user: {id: 101, username: 'guest', email: 'guest@abc.xyz', password: 'guest', admin: false},
            cartProducts: [],
            totalPrice: 0,
            totalQty: 0
        }
    }

    getProductQuantity(productId: number): number {
        const existingCartProduct: CartProduct | undefined = this.cartProductList.find(
            cartProduct => cartProduct.product.id === productId);
        return existingCartProduct ? existingCartProduct.quantity : 0;
    }

    addProductToCart(product: Product) {

        // Find the existing cart product
        const existingCartProduct: CartProduct | undefined = this.cartProductList.find(
            cartProduct => cartProduct.product.id === product.id);

        if (existingCartProduct) {
            // Update the quantity and price of the existing cart product
            existingCartProduct.quantity += 1;
            existingCartProduct.subtotalPrice += product.unitPrice;
        } else {
            // Add the product to the cart products list if it does not already exist in the cart
            let tempCartProduct: CartProduct = {
                id: this.cartProductList.length + 1,
                product: product,
                subtotalPrice: product.unitPrice,
                quantity: 1
            };
            this.cartProductList.push(tempCartProduct);
        }

        //  Update the cart products list, total price and total quantity in the cart list
        this.cartList[0].cartProducts = this.cartProductList;
        this.cartList[0].totalPrice += product.unitPrice;
        this.cartList[0].totalQty += 1;

        localStorage.setItem(this.keyShoppingCart, JSON.stringify(this.cartList));

    }

    removeProductFromCart(product: Product) {
        const existingCartProduct: CartProduct | undefined = this.cartProductList.find(
            cartProduct => cartProduct.product.id === product.id);

        if (existingCartProduct) {
            existingCartProduct.quantity -= 1;  //  Decrement the quantity of the existing cart product

            //  Update the subtotal price of the existing cart product
            if (existingCartProduct.quantity > 0) existingCartProduct.subtotalPrice -= product.unitPrice;
            else {
                //  Remove the product from the cart products list if the quantity is 0
                this.cartProductList = this.cartProductList
                    .filter(cartProduct => cartProduct.product.id !== product.id);
            }
        }

        //  Update the cart products list, total price and total quantity in the cart list
        this.cartList[0].cartProducts = this.cartProductList;
        this.cartList[0].totalPrice -= product.unitPrice;
        this.cartList[0].totalQty -= 1;

        localStorage.setItem(this.keyShoppingCart, JSON.stringify(this.cartList));
    }

    public getCartList(): Cart[] {
        return this.cartList;
    }

}
