import {inject, Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import {CanActivateFn, Router} from "@angular/router";
import {map, Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService {

    constructor(private authService: AuthService, private router: Router) {
    }

    checkLogin(): Observable<boolean> {
        return this.authService.loggedInUser$.pipe(
            map(user => {
                if (user) {
                    return true;
                } else {
                    this.router.navigate(['/login']);
                    return false;
                }
            })
        );
    }

}

// Define the canActivate function using the AuthGuardService
export const canActivateAuth: CanActivateFn = (route, state) => {
    const authGuardService = inject(AuthGuardService);
    return authGuardService.checkLogin();
};
