import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-options-menu',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './options-menu.component.html',
})
export class OptionsMenuComponent {

    optionsBtn: HTMLElement | null = document.getElementById('options-button');
    optionsMenu: HTMLElement | null = document.getElementById('options-menu'); // Targets the dropdown menu element

    constructor() {

        // Accessibility: Close this.optionsMenu when clicking outside the dropdown
        document.addEventListener('click', (event) => {
            console.log('document.addEventListener Invoked. ' + event.target);
            if (!this.optionsBtn?.contains(event.target as Node) && !this.optionsMenu?.contains(event.target as Node)) {
                this.optionsMenu?.classList.add('hidden');
                console.log('this.optionsMenu: ' + this.optionsMenu + ' | this.optionsMenu?.classList : ' + this.optionsMenu?.classList);
            }
        });

    }

    // Options Btn Click Handler to toggle the dropdown visibility
    toggleMenu() {

        this.optionsBtn = document.getElementById('options-button');
        this.optionsMenu = document.getElementById('options-menu'); // Targets the dropdown menu element;
        // console.log(event);
        // console.log('this.optionsBtn: ' + this.optionsBtn + ' | this.optionsBtn?.classList : ' + this.optionsBtn?.classList);
        // console.log('this.optionsMenu: ' + this.optionsMenu + ' | this.optionsMenu?.classList : ' + this.optionsMenu?.classList);

        this.optionsMenu?.classList.toggle('hidden'); // Toggles the 'hidden' class for visibility control
    }

}
