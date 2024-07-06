import {Component, output, OutputEmitterRef} from '@angular/core';
import {OptionsMenuComponent} from "./options-menu/options-menu.component";

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [OptionsMenuComponent],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent {

    shoppingCartClicked: OutputEmitterRef<void> = output();
    // @Output() shoppingCartClicked: EventEmitter<void> = new EventEmitter<void>();

    handleShoppingCartNavBtnClick() {
        console.log('L0G - [navbar.component] - handleShoppingCartNavBtnClick() - Method Invoked.');
        this.shoppingCartClicked.emit();
    }

}
