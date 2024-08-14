import {Injectable, output, OutputEmitterRef} from '@angular/core';
import {Product} from "../interface/Product";
import {Cart} from "../interface/Cart";
import {CartProduct} from "../interface/CartProduct";

@Injectable({
    providedIn: 'root'
})
export class ShoppingCartService {

    private cartList: Cart[] = [];
    private cartProductList: CartProduct[];
    private keyShoppingCart: string = 'shopping-cart';
    cartUpdated: OutputEmitterRef<void> = output();

    constructor() {
        this.cartList = this.initCartList();
        this.cartProductList = this.initCartProductList();
    }

    initCartList() {
        let strTempEmptyCartList: string = JSON.stringify([this.getEmptyCartForGuestUser()]);
        let storedCarts: string | null = localStorage.getItem(this.keyShoppingCart);

        //  If storedCarts is null, initialize the local storage with an empty cart list
        if (!storedCarts) localStorage.setItem(this.keyShoppingCart, strTempEmptyCartList);

        return JSON.parse(storedCarts || strTempEmptyCartList);
    }

    private initCartProductList() {
        //  Return the cart products list if cart is not empty, else return an empty list
        return this.cartList.length > 0 ? this.cartList[0].cartProducts : [];
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

        this.cartUpdated.emit();

    }

    removeProductFromCart(product: Product) {
        const existingCartProduct: CartProduct | undefined = this.cartProductList.find(
            cartProduct => cartProduct.product.id === product.id);

        if (existingCartProduct) {
            existingCartProduct.quantity -= 1;

            if (existingCartProduct.quantity > 0) existingCartProduct.subtotalPrice -= product.unitPrice;
            else this.cartProductList = this.cartProductList
                .filter(cartProduct => cartProduct.product.id !== product.id);
        }

        //  Update the cart products list, total price and total quantity in the cart list
        this.cartList[0].cartProducts = this.cartProductList;
        this.cartList[0].totalPrice -= product.unitPrice;
        this.cartList[0].totalQty -= 1;
        localStorage.setItem(this.keyShoppingCart, JSON.stringify(this.cartList));
        this.cartUpdated.emit();

    }

    public removeAllProductsFromCart() {
        this.cartList[0].cartProducts = this.cartProductList = [];
        this.cartList[0].totalPrice = 0;
        this.cartList[0].totalQty = 0;
        localStorage.setItem(this.keyShoppingCart, JSON.stringify(this.cartList));
        this.cartUpdated.emit();
    }

    getCart(): Cart {
        return this.cartList.length > 0 ? this.cartList[0] : this.getEmptyCartForGuestUser();
    }

}
