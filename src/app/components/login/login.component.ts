import {Component} from '@angular/core';
import {LoginService} from "../../service/login.service";
import {User} from "../../interface/User";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [NgIf],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {

    loggedInUser: User | undefined = undefined;

    constructor(private loginService: LoginService) {
    }

    login(strInputEmail: string, strInputPassword: string) {
        console.log('L0G - [login.component] - login() - Method invoked.');
        console.log('strInputEmail: ' + strInputEmail + ' | strInputPassword: ' + strInputPassword);

        this.loggedInUser = this.loginService.loginUser(strInputEmail, strInputPassword);
        console.log('loggedInUser: ' + this.loggedInUser);

    }

}
