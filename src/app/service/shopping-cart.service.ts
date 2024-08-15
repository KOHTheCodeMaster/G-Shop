import {Injectable, output, OutputEmitterRef} from '@angular/core';
import {Product} from "../interface/Product";
import {Cart} from "../interface/Cart";
import {CartProduct} from "../interface/CartProduct";
import {AuthService} from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class ShoppingCartService {

    private cartList: Cart[] = [];
    // private cartProductList: CartProduct[];
    private keyShoppingCart: string = 'shopping-cart';
    cartUpdated: OutputEmitterRef<void> = output();

    constructor(private authService: AuthService) {
        this.cartList = this.initCartList();
        // this.cartProductList = this.initCartProductList();
    }

    initCartList() {
        let strTempEmptyCartList: string = JSON.stringify([this.getEmptyCartForGuestUser()]);
        let storedCarts: string | null = localStorage.getItem(this.keyShoppingCart);

        //  If storedCarts is null, initialize the local storage with an empty cart list
        if (!storedCarts) localStorage.setItem(this.keyShoppingCart, strTempEmptyCartList);

        return JSON.parse(storedCarts || strTempEmptyCartList);
    }

    // private initCartProductList() {
    //     const userCart = this.cartList.find(cart => cart.user.id === this.authService.getCurrentUserId());
    //     return userCart ? userCart.cartProducts : [];
    // }

    private getEmptyCartForGuestUser(): Cart {
        return {
            id: 0,
            user: this.authService.getGuestUser(),
            cartProducts: [],
            totalPrice: 0,
            totalQty: 0
        }
    }

    getProductQuantity(productId: number): number {

        //  Get the cart product for the current user with the specified product id
        let existingCartProduct: CartProduct | undefined = this.getCartForCurrentUser().cartProducts
            .find(cartProduct => cartProduct.product.id === productId);

        //  If the cart product exists, return the quantity, else return 0
        return existingCartProduct ? existingCartProduct.quantity : 0;

    }

    addProductToCart(product: Product) {

        let userCart = this.getCartForCurrentUser();

        //  If the user cart does not exist, create a new cart for the current user
        if (!userCart) {
            userCart = this.getEmptyCartForGuestUser();
            userCart.user = this.authService.getCurrentUser();
            this.cartList.push(userCart);
        }

        const existingCartProduct: CartProduct | undefined = userCart.cartProducts.find(
            cartProduct => cartProduct.product.id === product.id);

        if (existingCartProduct) {
            // Update the quantity and price of the existing cart product
            existingCartProduct.quantity += 1;
            existingCartProduct.subtotalPrice += product.unitPrice;
        } else {
            // Add the product to the cart products list if it does not already exist in the cart
            let tempCartProduct: CartProduct = {
                id: userCart.cartProducts.length + 1,
                product: product,
                subtotalPrice: product.unitPrice,
                quantity: 1
            };
            userCart.cartProducts.push(tempCartProduct);
        }

        userCart.totalPrice += product.unitPrice;
        userCart.totalQty += 1;
        localStorage.setItem(this.keyShoppingCart, JSON.stringify(this.cartList));
        this.cartUpdated.emit();    //  Product added, Notify Navbar & Product Card to update the product quantity

    }

    removeProductFromCart(product: Product) {

        let userCart: Cart = this.getCartForCurrentUser();

        if (userCart) {
            const existingCartProduct: CartProduct | undefined = userCart.cartProducts.find(
                cartProduct => cartProduct.product.id === product.id);

            if (existingCartProduct) {
                existingCartProduct.quantity -= 1;

                //  If quantity is greater than 0, decrement the total price, else remove the product from cart
                if (existingCartProduct.quantity > 0) existingCartProduct.subtotalPrice -= product.unitPrice;
                else userCart.cartProducts = userCart.cartProducts
                    .filter(cartProduct => cartProduct.product.id !== product.id);
            }

            userCart.totalPrice -= product.unitPrice;
            userCart.totalQty -= 1;

/*
            //  ToDo - #10 - Check & Note down the significance of the below code
            //  Comment Marked For Future Reference
            //  Do we need to update the cart list with the updated user cart?
            //  No, as we are updating the userCart object directly

            //  Update the cart list with the updated user cart
            // this.cartList[this.cartList.findIndex(cart => cart.user.id === userCart.user.id)] = userCart;
            // this.cartList = this.cartList.map(cart => cart.user.id === userCart.user.id ? userCart : cart);
*/

            localStorage.setItem(this.keyShoppingCart, JSON.stringify(this.cartList));

            //  Product was removed, Notify Navbar & Product Card to update the product quantity
            this.cartUpdated.emit();
        }

    }

    public removeAllProductsFromCart() {

        let userCart = this.getCartForCurrentUser();

        if (userCart) {
            userCart.cartProducts = [];
            userCart.totalPrice = 0;
            userCart.totalQty = 0;
            localStorage.setItem(this.keyShoppingCart, JSON.stringify(this.cartList));
            this.cartUpdated.emit();    //  All products removed, Notify Navbar & Product Card to update the product quantity
        }

    }

    copyGuestCartToUserCart(userId: number, cart: Cart) {

        let existingCart: Cart | undefined = this.cartList.find(cart => cart.user.id === userId);

        if (existingCart) {
            // existingCart.cartProducts = cart.cartProducts;   //  This will not work as it will create a reference
            existingCart.cartProducts = JSON.parse(JSON.stringify(cart.cartProducts));  //  Deep copy of cart products
            existingCart.totalPrice = cart.totalPrice;
            existingCart.totalQty = cart.totalQty;
        } else {
            let tempNewCart: Cart = this.getCopyOfCart(cart);
            tempNewCart.user = this.authService.getUserById(userId);
            tempNewCart.id = tempNewCart.user.id;
            this.cartList.push(tempNewCart);
        }

        this.cartUpdated.emit();    //  Cart updated, Notify Navbar & Product Card to update the product quantity
        localStorage.setItem(this.keyShoppingCart, JSON.stringify(this.cartList));

    }

    getCopyOfCart(cartToBeCopied: Cart): Cart {
        //  Return a deep copy of the cartToBeCopied to avoid reference issues.
        return JSON.parse(JSON.stringify(cartToBeCopied));
    }

    getCartByUserId(userId: number): Cart {
        return this.cartList.find(cart => cart.user.id === userId) || this.getEmptyCartForGuestUser();
    }

    getCartForCurrentUser(): Cart {
        return this.getCartByUserId(this.authService.getCurrentUserId());
    }

    getCartForGuestUser(): Cart {
        return this.getCartByUserId(0);
    }

    initializeUserCart() {

        let userCart = this.getCartForCurrentUser();
        let guestCart = this.getCartForGuestUser();

        //  Copy the guest cart to the user cart if the user cart is empty and the guest cart is not
        if (userCart.totalQty === 0 && guestCart.totalQty > 0)
            this.copyGuestCartToUserCart(this.authService.getCurrentUserId(), guestCart);

    }

}
