import {User} from "./User";
import {CartProduct} from "./CartProduct";

export interface Cart {
    id: number,
    user: User,
    cartProducts: CartProduct[];
    totalPrice: number;
    totalQty: number;
}
