import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {User} from "../interface/User";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private usersUrl: string = '/assets/users.json';
    private http: HttpClient;

    constructor() {
        this.http = inject(HttpClient);
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.usersUrl);
    }

}
