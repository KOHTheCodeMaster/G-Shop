import {Injectable} from '@angular/core';
import {LoginService} from "./login.service";
import {User} from "../interface/User";
import {BehaviorSubject, Observable, Observer} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    loggedInUser$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
    // loggedInUser$: Observable<User | null> = this.loggedInUserSubject.asObservable();

    constructor(private loginService: LoginService) {
    }

    login(strInputEmail: string, strInputPassword: string) {

        const user: User | null = this.loginService.loginUser(strInputEmail, strInputPassword);

        if (user) this.loggedInUser$.next(user);
        else console.error('Invalid login credentials'); // ToDo: Handle invalid login

    }

    logout() {
        this.loggedInUser$.next(null);
    }

}
