import {Component, EventEmitter, output, Output, OutputEmitterRef} from '@angular/core';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent {

    shoppingCartClicked:OutputEmitterRef<void> = output();
    // @Output() shoppingCartClicked: EventEmitter<void> = new EventEmitter<void>();

    handleShoppingCartNavBtnClick() {
        console.log('L0G - [navbar.component] - handleShoppingCartNavBtnClick() - Method Invoked.');
        this.shoppingCartClicked.emit();
    }

}
