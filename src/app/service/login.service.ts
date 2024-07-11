import {Injectable, output, OutputEmitterRef} from '@angular/core';
import {User} from "../interface/User";

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    loggedInUser: User | null = null;
    emitUserLoggedInEvent: OutputEmitterRef<User | null> = output();
    emitUserLoggedOutEvent: OutputEmitterRef<void> = output();

    protected userList: User[] = [
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
        console.log('LoginService - constructor invoked.');
        console.log('constructor() - loggedInUser.username: ' + this.loggedInUser?.username);
    }

    getAllUsers(): User[] {
        return this.userList;
    }

    getUserById(id: number): User | null {
        return this.userList.find(user => user.id === id) ?? null;
    }

    loginUser(strInputEmail: string, strInputPassword: string): User | null {

        let allUsers: User[] = this.getAllUsers();

        for (const user of allUsers) {
            if (user.email.toLowerCase() === strInputEmail && user.password.toLowerCase() === strInputPassword) {
                this.loggedInUser = user;
                break;
            }
        }

        console.log('loginUser() - loggedInUser.username: ' + this.loggedInUser?.username);
        this.emitUserLoggedInEvent.emit(this.loggedInUser);

        return this.loggedInUser;
    }

}
