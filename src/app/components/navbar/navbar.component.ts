import {Component, output, OutputEmitterRef} from '@angular/core';
import {OptionsMenuComponent} from "./options-menu/options-menu.component";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [OptionsMenuComponent, RouterLink],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent {

    brandLogoClicked: OutputEmitterRef<void> = output();
    shoppingCartClicked: OutputEmitterRef<void> = output();
    loginClicked: OutputEmitterRef<void> = output();

    handleBrandBtnClick() {
        console.log('L0G - [navbar.component] - handleBrandBtnClick() - Method Invoked.');
        this.brandLogoClicked.emit();
    }

    handleShoppingCartNavBtnClick() {
        console.log('L0G - [navbar.component] - handleShoppingCartNavBtnClick() - Method Invoked.');
        this.shoppingCartClicked.emit();
    }

    loginNavBtnClicked() {
        console.log('L0G - [navbar.component] - loginNavBtnClicked() - Method Invoked.');
        this.loginClicked.emit();
    }

}
