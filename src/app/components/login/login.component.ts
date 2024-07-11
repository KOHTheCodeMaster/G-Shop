import {Component} from '@angular/core';
import {NgIf} from "@angular/common";
import {AuthService} from "../../service/auth.service";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [NgIf],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {

    constructor(public authService: AuthService) {
    }

    login(strInputEmail: string, strInputPassword: string) {
        this.authService.login(strInputEmail, strInputPassword);
    }

}
