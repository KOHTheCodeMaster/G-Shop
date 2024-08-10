import {Injectable} from '@angular/core';
import {LoginService} from "./login.service";
import {User} from "../interface/User";
import {BehaviorSubject} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    loggedInUser$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
    isAdmin: boolean = false;

    constructor(private loginService: LoginService, private route: ActivatedRoute) {
    }

    storeReturnUrlToLocalStorage() {
        //  Store the return URL for redirection after login
        let returnUrl: string = this.route.snapshot.queryParams['returnUrl'] || '/';
        localStorage.setItem('returnUrl', returnUrl);
    }

    login(strInputEmail: string, strInputPassword: string) {

        this.storeReturnUrlToLocalStorage();  //  Store the return URL for redirection after login

        this.loginService.loginUser(strInputEmail, strInputPassword).subscribe(user => {
            this.processLogin(user);
        });

    }

    processLogin(user: User | null) {
        if (user) {
            this.loggedInUser$.next(user);
        } else console.error('Invalid login credentials'); // ToDo: Handle invalid login

    }

    logout() {
        this.loggedInUser$.next(null);
    }

}
