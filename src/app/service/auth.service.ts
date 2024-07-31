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

    // loggedInUser$: Observable<User | null> = this.loggedInUserSubject.asObservable();

    constructor(private loginService: LoginService, private route: ActivatedRoute) {
    }

    login(strInputEmail: string, strInputPassword: string) {

        //  Store the return URL for redirection after login
        let returnUrl: string = this.route.snapshot.queryParams['returnUrl'] || '/';
        localStorage.setItem('returnUrl', returnUrl);

        const user: User | null = this.loginService.loginUser(strInputEmail, strInputPassword);

        if (user) {
            this.loggedInUser$.next(user);
            this.isAdmin = user.admin;
        } else console.error('Invalid login credentials'); // ToDo: Handle invalid login

    }

    logout() {
        this.loggedInUser$.next(null);
        this.isAdmin = false;
    }

}
