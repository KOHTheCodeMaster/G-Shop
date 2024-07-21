import {inject, Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {map, Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService {

    constructor(private authService: AuthService, private router: Router) {
    }

    // Define the canActivate function by injecting the AuthGuardService and calling the checkLogin method
    canActivateAuth(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const authGuardService: AuthGuardService = inject(AuthGuardService);
        return authGuardService.checkLogin();
    };

/*
    //  Doesn't Work!
    // Declare the authUsingCanActivateFnInternally function using the CanActivateFn type
    authUsingCanActivateFnInternally: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> =>  {
        const authGuardService: AuthGuardService = inject(AuthGuardService);
        return authGuardService.checkLogin();
    };
*/

    // Check if the user is logged in - optimized implementation - Using !!, || & comma operators.
    checkLogin(): Observable<boolean> {
        /*
            The loggedInUser$ observable emits the user object when the user logs in.
            Using comma operator, the map operator first checks if the user is logged in, and returns true.
            If the user is not logged in, the map operator navigates to the login page and returns false.
            Note:
            - !!user returns true if user is not null or undefined, otherwise it returns false.
            - The || operator returns the first truthy value or the last value if no truthy value is found.
            - The comma operator evaluates each expression from left to right and returns the value of the last expression.
         */
        return this.authService.loggedInUser$.pipe(
            map(user => !!user || (this.router.navigate(['/login']), false))
        );
    }

    // Check if the user is logged in - alternative implementation (Less readable)
    checkLogin2(): Observable<boolean> {
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

// Define the authUsingCanActivateFnExternally function using the CanActivateFn type
export const authUsingCanActivateFnExternally: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {
    const authGuardService = inject(AuthGuardService);
    return authGuardService.checkLogin();
};
