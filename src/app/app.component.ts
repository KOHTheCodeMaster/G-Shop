import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {NavbarComponent} from "./components/navbar/navbar.component";
import {HomeComponent} from "./components/home/home.component";
import {AuthService} from "./service/auth.service";
import {User} from "./interface/User";
import {ProductService} from "./service/product.service";
import {ShoppingCartService} from "./service/shopping-cart.service";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, NavbarComponent, HomeComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {

    constructor(private router: Router, authService: AuthService,
                private productService: ProductService,
                private shoppingCartService: ShoppingCartService) {

        this.resetProductsFromLocalStorage();

        authService.loggedInUser$.subscribe((loggedInUser$: User | null) =>
            this.loggedInUserChanged(loggedInUser$));

    }

    private loggedInUserChanged(loggedInUser$: User | null) {
        console.log('L0G - [app.component] - loggedInUserChanged() - Method Invoked.');

        //  Notify Navbar to update the shopping cart items count & Product Card to update the product quantity
        this.shoppingCartService.cartUpdated.emit();

        if (loggedInUser$) {
            //  Copy the guest cart to the user cart if the user cart is empty and the guest cart is not
            this.shoppingCartService.initializeUserCart();

            let returnUrl: string | null = localStorage.getItem('returnUrl');
            this.router.navigateByUrl(returnUrl || '/');
        }
    }

    private resetProductsFromLocalStorage() {
        //  Reset Local Storage
        localStorage.removeItem('products');

        // Initialize local storage with products.json data if not already present
        this.productService.loadInitialData();
    }

    onBrandLogoClickedEvent() {
    }

    onShoppingCartClickedEvent() {
    }

    onLoginClickedEvent() {
    }

}
