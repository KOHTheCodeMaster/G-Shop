import {Component, output, OutputEmitterRef} from '@angular/core';
import {OptionsMenuComponent} from "./options-menu/options-menu.component";
import {Router, RouterLink} from "@angular/router";
import {AsyncPipe, NgIf} from "@angular/common";
import {AuthService} from "../../service/auth.service";
import {TestingMenuComponent} from "./testing-menu/testing-menu.component";
import {Cart} from "../../interface/Cart";
import {ShoppingCartService} from "../../service/shopping-cart.service";

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [OptionsMenuComponent, RouterLink, NgIf, AsyncPipe, TestingMenuComponent],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent {

    brandLogoClicked: OutputEmitterRef<void> = output();
    shoppingCartClicked: OutputEmitterRef<void> = output();
    loginClicked: OutputEmitterRef<void> = output();
    shoppingCartItemsCount: number;
    private keyShoppingCart: string = 'shopping-cart';

    constructor(public authService: AuthService, shoppingCartService: ShoppingCartService, private router: Router) {

        this.shoppingCartItemsCount = this.fetchShoppingCartItemsCount();   //  Initialize shopping cart items count

        //  Whenever cart is updated, update the shopping cart items count
        shoppingCartService.cartUpdated.subscribe(() => {
            this.shoppingCartItemsCount = this.fetchShoppingCartItemsCount();
        });

    }

    fetchShoppingCartItemsCount(): number {
        let tempCartList: Cart[] = JSON.parse(localStorage.getItem(this.keyShoppingCart) || '');

        //  Return 0 if cart is empty, else return total quantity of products in cart
        if (!tempCartList || tempCartList.length === 0) return 0;
        else return tempCartList[0].totalQty;
    }

    handleBrandBtnClick() {
        this.brandLogoClicked.emit();
    }

    handleShoppingCartNavBtnClick() {
        this.shoppingCartClicked.emit();
    }

    loginNavBtnClicked() {
        this.loginClicked.emit();
    }

    onUserLoggedOutEvent() {
        this.authService.logout();
    }

    handleCheckoutNavBtnClick() {
        this.router.navigate(['/checkout']);
    }

}
