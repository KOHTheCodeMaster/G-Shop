import {Cart} from './Cart';
import {DeliveryFormData} from "./DeliveryFormData";

export interface Order {
    id: number;
    cart: Cart;
    deliveryFormData: DeliveryFormData;
    orderDate: Date;
}
