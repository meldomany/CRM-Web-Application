import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { NotFoundComponent } from './_views/errors/not-found/not-found.component';
import { ServerErrorComponent } from './_views/errors/server-error/server-error.component';
import { HomeComponent } from './_views/home/home.component';
import { HeaderComponent } from './_views/layouts/header/header.component';
import { NavbarComponent } from './_views/layouts/navbar/navbar.component';
import { LoginComponent } from './_views/authentication/login/login.component';
import { RegisterComponent } from './_views/authentication/register/register.component';
import { ErrorHandlerInterceptor } from './_interceptors/error-handler.interceptor';
import { TokenHeaderInterceptor } from './_interceptors/token-header.interceptor';
import { CustomersComponent } from './_views/customers/customers.component';
import { CreateCustomerComponent } from './_views/customers/create-customer/create-customer.component';
import { EditCustomerComponent } from './_views/customers/edit-customer/edit-customer.component';
import { ProductsComponent } from './_views/products/products.component';
import { ModificationComponent } from './_views/products/modification/modification.component';
import { OrdersComponent } from './_views/orders/orders.component';
import { CreateOrderComponent } from './_views/orders/create-order/create-order.component';
import { EditOrderComponent } from './_views/orders/edit-order/edit-order.component';
import { SpinnerLoaderInterceptor } from './_interceptors/spinner-loader.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    ServerErrorComponent,
    HomeComponent,
    HeaderComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    CustomersComponent,
    CreateCustomerComponent,
    EditCustomerComponent,
    ProductsComponent,
    ModificationComponent,
    OrdersComponent,
    CreateOrderComponent,
    EditOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () =>  { return localStorage.getItem("authResult") },
        allowedDomains: ["http://localhost:4200"],
        disallowedRoutes: [],
      },
    }),
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: TokenHeaderInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: SpinnerLoaderInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
