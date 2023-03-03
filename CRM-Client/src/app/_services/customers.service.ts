import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CustomerCreationModel } from '../_models/customer/customer-creation.model';
import { CustomerEditionModel } from '../_models/customer/customer-edition.model';
import { CustomerSelectBoxModel } from '../_models/customer/customer-selectbox.model';
import { CustomerSelectionModel } from '../_models/customer/customer-selection.model';
import { CustomerModel } from '../_models/customer/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  
  private baseUrl = environment.baseUrl + 'Customers/';
  
  constructor(private http: HttpClient, private router: Router) { }

  getAllCustomers(){
    return this.http.get<CustomerModel[]>(this.baseUrl + 'GetAllCustomers');
  }

  getCustomer(code: string){
    return this.http.get<CustomerSelectionModel>(this.baseUrl + 'GetCustomer/' + code);
  }

  CreateCustomer(customerCreationModel: CustomerCreationModel){
    return this.http.post(this.baseUrl + 'CreateCustomer/', customerCreationModel);
  }

  UpdateCustomer(customerEditionModel: CustomerEditionModel){
    return this.http.put(this.baseUrl + 'UpdateCustomer/', customerEditionModel);
  }

  RemoveAddress(addressId: number){
    return this.http.delete(this.baseUrl + 'DeleteAddress/' + addressId);
  }

  getAllCustomersSelectBox(){
    return this.http.get<CustomerSelectBoxModel[]>(this.baseUrl + 'GetAllCustomersSelectBox');
  }
}
