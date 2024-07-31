import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {AsyncPipe, NgIf} from "@angular/common";
import {AuthService} from "../../service/auth.service";

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [RouterOutlet, AsyncPipe, NgIf],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {

    strWelcomeMsg: string = 'Welcome To G-Shop..!! ^-^';
    strUserNotLoggedInMsg: string = 'User Not Logged In..!!';

    constructor(public authService: AuthService) {
    }

}
