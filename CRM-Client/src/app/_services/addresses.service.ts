import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AddressSelectionModel } from '../_models/address/address-selection.model';

@Injectable({
  providedIn: 'root'
})
export class AddressesService {

  private baseUrl = environment.baseUrl + 'Addresses/';
  
  constructor(private http: HttpClient, private router: Router) { }

  getAllShippingAddresses(customerId: number){
    return this.http.get<AddressSelectionModel[]>(this.baseUrl + 'GetAllShippingAddress/' + customerId);
  }
  
  getAllBillingAddresses(customerId: number){
    return this.http.get<AddressSelectionModel[]>(this.baseUrl + 'GetAllBillingAddress/' + customerId);
  }

}
