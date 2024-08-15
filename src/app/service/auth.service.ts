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

    getCurrentUserId(): number {
        return this.loggedInUser$.value?.id || 0;
    }

    getUserById(userId: number): User {
        return this.loggedInUser$.value?.id === userId ? this.loggedInUser$.value : this.getGuestUser();
    }

    getCurrentUser(): User {
        return this.getUserById(this.getCurrentUserId());
    }

    getGuestUser(): User {
        return {id: 0, username: 'guest', email: 'guest@abc.xyz', password: 'guest', admin: false};
    }

}
