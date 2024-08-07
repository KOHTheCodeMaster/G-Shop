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

    loginUserAdminBtnClicked() {
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

    loginUserTestBtnClicked() {
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

    private handleUserLogin(user: User) {
        this.authService.login(user.email, user.password);
    }

}
