import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavbarComponent} from "./components/navbar/navbar.component";
import {HomeComponent} from "./components/home/home.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, NavbarComponent, HomeComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {

    onShoppingCartClickedEvent() {
        console.log('L0G - [app.component] - onShoppingCartClickedEvent() - Method invoked.');
    }

    onBrandLogoClickedEvent() {
        console.log('L0G - [app.component] - onBrandLogoClickedEvent() - Method invoked.');
    }

}
