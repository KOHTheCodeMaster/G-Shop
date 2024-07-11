import {Injectable} from '@angular/core';
import {LoginService} from "./login.service";
import {User} from "../interface/User";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    loggedInUser: User | null = null;
    // emitUserLoggedInEvent: OutputEmitterRef<User | null> = output();
    // emitUserLoggedOutEvent: OutputEmitterRef<void> = output();

    constructor(private loginService: LoginService) {
    }

    login(strInputEmail: string, strInputPassword: string) {
        this.loggedInUser = this.loginService.loginUser(strInputEmail, strInputPassword);
        // this.emitUserLoggedInEvent.emit(this.loggedInUser);
    }

    logout() {
        this.loggedInUser = null;
        // this.emitUserLoggedOutEvent.emit();
    }

}
