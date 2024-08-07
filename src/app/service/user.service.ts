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

    userList: User[] = [
        {
            id: 0,
            username: 'Admin',
            email: 'admin@gmail.com',
            password: 'admin',
            admin: true,
        },
        {
            id: 1,
            username: 'John',
            email: 'john@gmail.com',
            password: 'john',
            admin: false,
        },
        {
            id: 2,
            username: 'test-user-1',
            email: 'test-user-1@abc.com',
            password: 'test',
            admin: false,
        },
        {
            id: 3,
            username: 'test-user-2',
            email: 'test-user-2@abc.com',
            password: 'test',
            admin: false,
        },
        {
            id: 4,
            username: 'test-user-3',
            email: 'test-user-3@abc.com',
            password: 'test',
            admin: false,
        },
        {
            id: 5,
            username: 'test-admin-1',
            email: 'test-admin-1@abc.com',
            password: 'admin',
            admin: true,
        },
    ];

    constructor() {
        this.http = inject(HttpClient);
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.usersUrl);
    }

    /*
        saveUsers(users: User[]): Observable<void> {
            // This is a placeholder. In a real application, you would use a backend service to save the data.
            return new Observable<void>(observer => {
                localStorage.setItem('users', JSON.stringify(users));
                observer.next();
                observer.complete();
            });
        }

        updateUser(user: User): Observable<void> {
            return new Observable<void>(observer => {
                let users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
                const index = users.findIndex(u => u.id === user.id);
                if (index !== -1) {
                    users[index] = user;
                    localStorage.setItem('users', JSON.stringify(users));
                }
                observer.next();
                observer.complete();
            });
        }
    */

}
