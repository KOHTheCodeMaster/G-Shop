import {Component, output, OutputEmitterRef} from '@angular/core';
import {OptionsMenuComponent} from "./options-menu/options-menu.component";
import {Router, RouterLink} from "@angular/router";
import {AsyncPipe, NgIf} from "@angular/common";
import {AuthService} from "../../service/auth.service";
import {TestingMenuComponent} from "./testing-menu/testing-menu.component";
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

    constructor(public authService: AuthService, shoppingCartService: ShoppingCartService, private router: Router) {

        //  Get the shopping cart items count
        this.shoppingCartItemsCount = shoppingCartService.getCart().totalQty;

        //  Whenever cart is updated, update the shopping cart items count
        shoppingCartService.cartUpdated.subscribe(() => {
            this.shoppingCartItemsCount = shoppingCartService.getCart().totalQty;
        });

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
