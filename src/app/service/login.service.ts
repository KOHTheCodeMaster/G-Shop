import {Injectable} from '@angular/core';
import {User} from "../interface/User";
import {UserService} from "./user.service";
import {map, Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private userService: UserService) {
    }

    /**
     * Logs in a user by checking the provided email and password against a list of users.
     * Using Async Call - UserService.getUsers()
     *
     * @param {string} strInputEmail - The email address input by the user.
     * @param {string} strInputPassword - The password input by the user.
     * @returns {Observable<User | null>} An observable that emits the logged-in user if found, or null if not found.
     */
    loginUser(strInputEmail: string, strInputPassword: string): Observable<User | null> {
        return this.userService.getUsers().pipe(
            map((allUsers: User[]) => {
                return allUsers.find(user =>
                    (user.email.toLowerCase() === strInputEmail && user.password === strInputPassword)) || null;
            })
        );
    }

}
