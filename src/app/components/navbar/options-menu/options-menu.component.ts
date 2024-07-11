import {Component, output, OutputEmitterRef} from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-options-menu',
    standalone: true,
    imports: [RouterLink, NgIf],
    templateUrl: './options-menu.component.html',
})
export class OptionsMenuComponent {

    optionsOpened: boolean = false;
    emitUserLoggedOut: OutputEmitterRef<void> = output();

    // Options Btn Click Handler to toggle the dropdown visibility
    toggleOptionsMenu() {
        this.optionsOpened = !this.optionsOpened;
    }

    logoutNavBtnClicked() {
        this.emitUserLoggedOut.emit();
    }

}
