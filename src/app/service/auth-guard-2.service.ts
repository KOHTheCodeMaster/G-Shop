import {inject, Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {map, Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService2 implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {
    }

    // Override the canActivate method of the CanActivate interface - inject the AuthGuardService and call the checkLogin method
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const authGuardService: AuthGuardService2 = inject(AuthGuardService2);
        return authGuardService.checkLogin();
    };

    // Check if the user is logged in - optimized implementation - Using !!, || & comma operators.
    checkLogin(): Observable<boolean> {
        return this.authService.loggedInUser$.pipe(
            map(user => !!user || (this.router.navigate(['/login']), false))
        );
    }

}
