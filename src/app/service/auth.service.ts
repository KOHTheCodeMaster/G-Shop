import {Injectable} from '@angular/core';
import {LoginService} from "./login.service";
import {User} from "../interface/User";
import {Observable, Observer} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    loggedInUser$: Observable<User>;

    constructor(private loginService: LoginService) {
        this.loggedInUser$ = this.initializeLoggedInUserObservable();
    }

    initializeLoggedInUserObservable(): Observable<User> {

        let observer: Observer<User> = {
            next: user => console.log('User: ' + user),
            error: err => console.log('err: ' + err),
            complete: () => console.log('Completed.')
        };

        let sequenceFunction = (obs: Observer<User>) => {
            let adminUser: User = {
                id: 0,
                username: 'Admin',
                email: 'admin@gmail.com',
                password: 'admin',
                admin: true,
            };

            obs.next(adminUser);
            obs.complete();
        };

        let observable: Observable<User> = new Observable<User>(sequenceFunction);
        return observable;

    }

    login(strInputEmail: string, strInputPassword: string) {
        let loginUser = this.loginService.loginUser(strInputEmail, strInputPassword);
    }

    logout() {
        // this.loggedInUser$ = null;
    }

}
