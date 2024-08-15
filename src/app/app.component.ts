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

    constructor(router: Router, authService: AuthService,
                private productService: ProductService,
                shoppingCartService: ShoppingCartService) {

        this.resetProductsFromLocalStorage();

        authService.loggedInUser$.subscribe((loggedInUser$: User | null) => {
            console.log('L0G - [app.component] - subscribe - loggedInUser$ - loggedInUser$:', loggedInUser$);
            if (loggedInUser$) {

                //  If the user cart is empty and the guest cart is not, update the user cart with the guest cart
                shoppingCartService.initializeCurrentUserCart();

                let returnUrl: string | null = localStorage.getItem('returnUrl');
                router.navigateByUrl(returnUrl || '/');
            }
        });

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
