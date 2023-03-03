import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatorGuard } from './_guards/authenticator.guard';
import { UnAuthenticatorGuard } from './_guards/un-authenticator.guard';
import { LoginComponent } from './_views/authentication/login/login.component';
import { RegisterComponent } from './_views/authentication/register/register.component';
import { CreateCustomerComponent } from './_views/customers/create-customer/create-customer.component';
import { CustomersComponent } from './_views/customers/customers.component';
import { EditCustomerComponent } from './_views/customers/edit-customer/edit-customer.component';
import { NotFoundComponent } from './_views/errors/not-found/not-found.component';
import { ServerErrorComponent } from './_views/errors/server-error/server-error.component';
import { HomeComponent } from './_views/home/home.component';
import { CreateOrderComponent } from './_views/orders/create-order/create-order.component';
import { EditOrderComponent } from './_views/orders/edit-order/edit-order.component';
import { OrdersComponent } from './_views/orders/orders.component';
import { ModificationComponent } from './_views/products/modification/modification.component';
import { ProductsComponent } from './_views/products/products.component';

const routes: Routes = [
  { path:"not-found", component:NotFoundComponent },
  { path:"server-error", component:ServerErrorComponent },
  { path: 'login', component: LoginComponent, canActivate: [UnAuthenticatorGuard]},
  { path: 'register', component: RegisterComponent, canActivate: [UnAuthenticatorGuard]},
  { path: 'home', component: HomeComponent},


  //Customer Routes
  { path: 'customers', component: CustomersComponent, canActivate: [AuthenticatorGuard]},
  { path: 'customers/create', component: CreateCustomerComponent, canActivate: [AuthenticatorGuard]},
  { path: 'customers/edit/:customerCode', component: EditCustomerComponent, canActivate: [AuthenticatorGuard]},

  //Product Routes
  { path: 'products', component: ProductsComponent, canActivate: [AuthenticatorGuard]},
  { path: 'products/:productId', component: ModificationComponent, canActivate: [AuthenticatorGuard]},

    //Order Routes
    { path: 'orders', component: OrdersComponent, canActivate: [AuthenticatorGuard]},
    { path: 'orders/create', component: CreateOrderComponent, canActivate: [AuthenticatorGuard]},
    { path: 'orders/edit/:orderId', component: EditOrderComponent, canActivate: [AuthenticatorGuard]},

  { path: "**", component: HomeComponent, pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
