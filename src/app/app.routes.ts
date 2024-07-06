import {Routes} from '@angular/router';
import {MyOrdersComponent} from "./components/user/my-orders/my-orders.component";
import {ManageOrdersComponent} from "./components/admin/manage-orders/manage-orders.component";
import {ManageProductsComponent} from "./components/admin/manage-products/manage-products.component";
import {LogoutComponent} from "./components/user/logout/logout.component";

export const routes: Routes = [
    {path: 'user/my-orders', component: MyOrdersComponent},
    {path: 'admin/manage-orders', component: ManageOrdersComponent},
    {path: 'admin/manage-products', component: ManageProductsComponent},
    {path: 'user/logout', component: LogoutComponent},
];
