import {Injectable} from '@angular/core';
import {User} from "../interface/User";

@Injectable({
    providedIn: 'root'
})
export class LoginService {

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

    getAllUsers(): User[] {
        return this.userList;
    }

    getUserById(id: number): User | null {
        return this.userList.find(user => user.id === id) ?? null;
    }

    loginUser(strInputEmail: string, strInputPassword: string): User | null {

        let allUsers: User[] = this.getAllUsers();
        let loggedInUser: User | null = null;

        for (const user of allUsers) {
            if (user.email.toLowerCase() === strInputEmail && user.password.toLowerCase() === strInputPassword) {
                loggedInUser = user;
                break;
            }
        }

        return loggedInUser;
    }

}
