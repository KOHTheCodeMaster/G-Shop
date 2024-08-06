import {Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import {map, Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AdminAuthGuardService {

    constructor(private authService: AuthService) {
    }

    // Check if the user is logged in and is an admin
    canActivate(): Observable<boolean> {
        console.log('L0G - [admin-auth-guard.service] - canActivate() - Method invoked.');

        return this.authService.loggedInUser$.pipe(map(user => {
            if (!!user && user.admin) return true;
            else {
                console.log('Access Denied - Admin access required. Logged in user is not an admin.');
                return false;
            }
        }));
    };

}
