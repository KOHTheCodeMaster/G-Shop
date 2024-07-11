import {Component, output, OutputEmitterRef} from '@angular/core';
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

    loggedInUser: User | null = null;
    userLoggedInEvent: OutputEmitterRef<User | null> = output();

    constructor(private loginService: LoginService) {
        this.loggedInUser = loginService.loggedInUser;
        console.log('loggedInUser.username: ' + (this.loggedInUser?.username ?? 'No User Logged In.'));
    }

    login(strInputEmail: string, strInputPassword: string) {
        console.log('L0G - [login.component] - login() - Method invoked.');
        console.log('strInputEmail: ' + strInputEmail + ' | strInputPassword: ' + strInputPassword);

        this.loggedInUser = this.loginService.loginUser(strInputEmail, strInputPassword);
        console.log('login() - loggedInUser.username: ' + this.loggedInUser?.username);

        this.userLoggedInEvent.emit(this.loggedInUser);

    }

}
