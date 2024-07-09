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

    getUserById(id: number): User | undefined {
        return this.userList.find(user => user.id === id);
    }

    submitForm(strEmail: string, strPassword: string) {
        console.log(`strEmail: ${strEmail}, strPassword: ${strPassword}`);
    }

    loginUser(strInputEmail: string, strInputPassword: string): User | undefined {

        let loggedInUser: User | undefined = undefined;
        let allUsers: User[] = this.getAllUsers();

        for (const user of allUsers) {

            /*
            console.log('user.email.toLowerCase(): ' + user.email.toLowerCase() + '\n' +
                'strInputEmail: ' + strInputEmail + '\n' +
                'user.password.toLowerCase(): ' + user.password.toLowerCase() + '\n' +
                'strInputPassword: ' + strInputPassword + '\n' +
                'user.email.toLowerCase() === strInputEmail: ' + (user.email.toLowerCase() === strInputEmail) + '\n' +
                'user.password.toLowerCase() === strInputEmail: ' + (user.password.toLowerCase() === strInputPassword) + '\n' +
                '\n\n');
            */

            if (user.email.toLowerCase() === strInputEmail && user.password.toLowerCase() === strInputPassword)
                loggedInUser = user;
        }

        return loggedInUser;

    }

}
