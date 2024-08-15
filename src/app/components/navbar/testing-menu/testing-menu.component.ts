import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";
import {User} from "../../../interface/User";
import {AuthService} from "../../../service/auth.service";

@Component({
    selector: 'app-testing-menu',
    standalone: true,
    imports: [RouterLink, NgIf],
    templateUrl: './testing-menu.component.html',
})
export class TestingMenuComponent {

    optionsOpened: boolean = false;

    constructor(private authService: AuthService) {
    }

    toggleOptionsMenu() {
        this.optionsOpened = !this.optionsOpened;   // Options Btn Click Handler to toggle the dropdown visibility
    }

    loginAdminUserBtnClicked() {
        // console.log('L0G - [testing-menu.component] - loginUserAdminBtnClicked() - Method Invoked.');

        let adminUser: User = {
            "id": 0,
            "username": "Admin",
            "email": "admin@gmail.com",
            "password": "admin",
            "admin": true
        };

        this.handleUserLogin(adminUser);
    }

    loginTestUser1BtnClicked() {
        // console.log('L0G - [testing-menu.component] - loginUserTestBtnClicked() - Method Invoked.');

        let testUser: User = {
            "id": 2,
            "username": "test-user-1",
            "email": "test-user-1@abc.com",
            "password": "test",
            "admin": false
        };

        this.handleUserLogin(testUser);
    }

    loginJohnUserBtnClicked() {
        // console.log('L0G - [testing-menu.component] - loginUserTestBtnClicked() - Method Invoked.');

        let testUser: User = {
            "id": 1,
            "username": "John",
            "email": "john@gmail.com",
            "password": "john",
            "admin": false
        };

        this.handleUserLogin(testUser);
    }

    private handleUserLogin(user: User) {
        this.authService.login(user.email, user.password);
    }

    clearLocalStorageBtnClicked() {

        console.log('L0G - [testing-menu.component] - clearLocalStorageBtnClicked() - Local Storage Cleared.');

        //  Reset Local Storage to clear all data
        localStorage.removeItem('products');
        localStorage.removeItem('orders');
        localStorage.removeItem('shopping-cart');
        localStorage.removeItem('returnUrl');

        window.location.reload();   //  Reload the page to reflect the changes

    }

}
