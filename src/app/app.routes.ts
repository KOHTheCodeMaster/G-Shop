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
import {AuthGuardService} from "./service/auth-guard.service";
import {AdminAuthGuardService} from "./service/admin-auth-guard.service";
import {ProductFormComponent} from "./components/admin/product-form/product-form.component";
import {ViewOrderComponent} from "./components/view-order/view-order.component";

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'products', component: ProductsComponent},

    //  Doesn't Work!
    // {path: 'shopping-cart', component: ShoppingCartComponent, canActivate: [AuthGuardService.prototype.authUsingCanActivateFnInternally]},
    // {path: 'shopping-cart', component: ShoppingCartComponent, canActivate: [AuthGuardService]},
    {path: 'shopping-cart', component: ShoppingCartComponent},

    {path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuardService]},
    {path: 'order-success', component: OrderSuccessComponent},
    {path: 'login', component: LoginComponent},

    {path: 'user/my-orders/:orderId', component: ViewOrderComponent},
    {path: 'user/my-orders', component: MyOrdersComponent},
    {path: 'user/logout', component: LogoutComponent},

    //  Admin Routes
    {
        path: 'admin/manage-orders', component: ManageOrdersComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService]
    },
    {
        path: 'admin/manage-products/new', component: ProductFormComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService]
    },
    {
        path: 'admin/manage-products/:productId', component: ProductFormComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService]
    },
    {
        path: 'admin/manage-products', component: ManageProductsComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService]
    },
];
