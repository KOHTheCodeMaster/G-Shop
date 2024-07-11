import {Component, output, OutputEmitterRef} from '@angular/core';
import {OptionsMenuComponent} from "./options-menu/options-menu.component";
import {RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";
import {LoginService} from "../../service/login.service";
import {User} from "../../interface/User";

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [OptionsMenuComponent, RouterLink, NgIf],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent {

    loggedInUser: User | null;
    brandLogoClicked: OutputEmitterRef<void> = output();
    shoppingCartClicked: OutputEmitterRef<void> = output();
    loginClicked: OutputEmitterRef<void> = output();

    constructor(private loginService: LoginService) {
        this.loggedInUser = loginService.loggedInUser;
        loginService.emitUserLoggedInEvent.subscribe(user => {
            this.onUserLoggedInEvent(user);
        });
    }

    handleBrandBtnClick() {
        console.log('L0G - [navbar.component] - handleBrandBtnClick() - Method Invoked.');
        this.brandLogoClicked.emit();
    }

    handleShoppingCartNavBtnClick() {
        console.log('L0G - [navbar.component] - handleShoppingCartNavBtnClick() - Method Invoked.');
        console.log('loggedInUser.username: ' + (this.loggedInUser?.username ?? 'No User Logged In.'));
        console.log('this.loginService.loggedInUser?.username: ' + (this.loginService.loggedInUser?.username ?? 'No User Logged In.'));
        this.shoppingCartClicked.emit();
    }

    loginNavBtnClicked() {
        console.log('L0G - [navbar.component] - loginNavBtnClicked() - Method Invoked.');
        this.loginClicked.emit();
    }

    onUserLoggedInEvent(loggedInUser: User | null) {
        console.log('onUserLoggedInEvent() - Method invoked.');
        console.log('onUserLoggedInEvent() - loggedInUser: ' + JSON.stringify(loggedInUser));
        this.loggedInUser = this.loginService.loggedInUser;
    }

    onUserLoggedOutEvent() {
        this.loggedInUser = null;
        this.loginService.loggedInUser = null;
        this.loginService.emitUserLoggedOutEvent.emit();
    }

}
