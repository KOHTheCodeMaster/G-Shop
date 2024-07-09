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

    shoppingCartClicked: OutputEmitterRef<void> = output();
    brandLogoClicked: OutputEmitterRef<void> = output();

    // @Output() shoppingCartClicked: EventEmitter<void> = new EventEmitter<void>();

    handleShoppingCartNavBtnClick() {
        console.log('L0G - [navbar.component] - handleShoppingCartNavBtnClick() - Method Invoked.');
        this.shoppingCartClicked.emit();
    }

    handleBrandBtnClick() {
        console.log('L0G - [navbar.component] - handleBrandBtnClick() - Method Invoked.');
        this.brandLogoClicked.emit();
    }
}
