import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { OrderHeaderCreationModel } from '../_models/order-header/order-header-creation.model';
import { OrderHeaderEditionModel } from '../_models/order-header/order-header-edition.model';
import { OrderHeaderSelectionModel } from '../_models/order-header/order-header-selection.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private baseUrl = environment.baseUrl + 'OrderHeaders/';
  
  constructor(private http: HttpClient, private router: Router) { }

  getAllOrderHeaders(){
    return this.http.get<OrderHeaderSelectionModel[]>(this.baseUrl + 'GetAllOrderHeaders');
  }

  getOrderHeader(id: number){
    return this.http.get<OrderHeaderSelectionModel>(this.baseUrl + 'GetOrderHeader/' + id);
  }

  CreateOrderHeader(orderHeaderCreationModel: OrderHeaderCreationModel){
    return this.http.post(this.baseUrl + 'CreateOrderHeader/', orderHeaderCreationModel);
  }

  UpdateOrderHeader(orderHeaderEditionModel: OrderHeaderEditionModel){
    return this.http.put(this.baseUrl + 'UpdateOrderHeader/', orderHeaderEditionModel);
  }

  RemoveOrderDetail(orderDetailId: number){
    return this.http.delete(this.baseUrl + 'DeleteOrderDetail/' + orderDetailId);
  }
}
