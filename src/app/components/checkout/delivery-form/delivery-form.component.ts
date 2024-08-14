import {Component, EventEmitter, Output} from '@angular/core';
import {DeliveryFormData} from '../../../interface/DeliveryFormData';
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-delivery-form',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './delivery-form.component.html',
    styleUrls: ['./delivery-form.component.css']
})
export class DeliveryFormComponent {

    deliveryFormData: DeliveryFormData;
    @Output() formDataChange: EventEmitter<DeliveryFormData> = new EventEmitter<DeliveryFormData>();

    constructor() {

        //  Initialize the delivery form data with default dummy data
        this.deliveryFormData = {
            name: 'Mr. Champak',
            address: 'Pratap Nagar',
            city: 'Jaipur',
            state: 'Rajasthan',
            zip: '123456'
        };

        this.formDataChange.emit(this.deliveryFormData);

    }

}
