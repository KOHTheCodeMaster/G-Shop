import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {NavbarComponent} from "./components/navbar/navbar.component";
import {HomeComponent} from "./components/home/home.component";
import {AuthService} from "./service/auth.service";
import {User} from "./interface/User";
import {ProductService} from "./service/product.service";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, NavbarComponent, HomeComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {

    constructor(router: Router, authService: AuthService, private productService: ProductService) {

        this.resetLocalStorage();

        authService.loggedInUser$.subscribe((loggedInUser$: User | null) => {
            console.log('L0G - [app.component] - subscribe - loggedInUser$ - loggedInUser$:', loggedInUser$);
            if (loggedInUser$) {
                let returnUrl: string | null = localStorage.getItem('returnUrl');
                router.navigateByUrl(returnUrl || '/');
            }
        });

    }

    private resetLocalStorage() {
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
