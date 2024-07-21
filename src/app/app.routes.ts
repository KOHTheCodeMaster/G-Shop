import {Routes} from '@angular/router';
import {MyOrdersComponent} from "./components/user/my-orders/my-orders.component";
import {ManageOrdersComponent} from "./components/admin/manage-orders/manage-orders.component";
import {ManageProductsComponent} from "./components/admin/manage-products/manage-products.component";
import {LogoutComponent} from "./components/user/logout/logout.component";
import {HomeComponent} from "./components/home/home.component";
import {ProductsComponent} from "./components/products/products.component";
import {ShoppingCartComponent} from "./components/shopping-cart/shopping-cart.component";
import {CheckoutComponent} from "./components/checkout/checkout.component";
import {OrderSuccessComponent} from "./components/order-success/order-success.component";
import {LoginComponent} from "./components/login/login.component";
import {AuthGuardService, authUsingCanActivateFnExternally} from "./service/auth-guard.service";

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'products', component: ProductsComponent},
    // {path: 'shopping-cart', component: ShoppingCartComponent, canActivate: [authUsingCanActivateFnExternally]},
    {path: 'shopping-cart', component: ShoppingCartComponent, canActivate: [AuthGuardService.prototype.canActivateAuth]},
    // {path: 'shopping-cart', component: ShoppingCartComponent, canActivate: [AuthGuardService.prototype.authUsingCanActivateFnInternally]},
    {path: 'check-out', component: CheckoutComponent},
    {path: 'order-success', component: OrderSuccessComponent},
    {path: 'login', component: LoginComponent},
    // {path: 'admin/products', component: AdminProductsComponent},
    // {path: 'admin/orders', component: AdminOrdersComponent},

    {path: 'user/my-orders', component: MyOrdersComponent},
    {path: 'user/logout', component: LogoutComponent},
    {path: 'admin/manage-orders', component: ManageOrdersComponent},
    {path: 'admin/manage-products', component: ManageProductsComponent},
];
