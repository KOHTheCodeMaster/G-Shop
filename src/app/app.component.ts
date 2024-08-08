import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {NavbarComponent} from "./components/navbar/navbar.component";
import {HomeComponent} from "./components/home/home.component";
import {AuthService} from "./service/auth.service";
import {User} from "./interface/User";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, NavbarComponent, HomeComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {

    constructor(private router: Router, private authService: AuthService) {

        this.resetLocalStorage();

        authService.loggedInUser$.subscribe((loggedInUser$: User | null) => {
            if (loggedInUser$) {
                let returnUrl: string | null = localStorage.getItem('returnUrl');
                router.navigateByUrl(returnUrl || '/');
            }
        });

    }

    private resetLocalStorage() {
        //  Reset Local Storage
        localStorage.removeItem('returnUrl');
        localStorage.removeItem('products');

        //  ToDo: This Resets Manage Products Page Data, Need to find a better way to re-initialize the data on startup
        //  When Manage Products Page is visited for the first time, it will not show any products due to this reset
        //  It will show products only after revisiting the page from another page
        //  This is to make constructor call again for loading products after reset
    }

    onBrandLogoClickedEvent() {
        console.log('L0G - [app.component] - onBrandLogoClickedEvent() - Method invoked.');
    }

    onShoppingCartClickedEvent() {
        console.log('L0G - [app.component] - onShoppingCartClickedEvent() - Method invoked.');
    }

    onLoginClickedEvent() {
        console.log('L0G - [app.component] - onLoginClickedEvent() - Method invoked.');
    }

}
