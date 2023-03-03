import { Component, OnInit } from '@angular/core';
import { OrderHeaderSelectionModel } from 'src/app/_models/order-header/order-header-selection.model';
import { OrdersService } from 'src/app/_services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders!: OrderHeaderSelectionModel[];

  constructor(private orderService: OrdersService) { }

  ngOnInit(): void {
    this.getOrderHeaders();
  }

  getOrderHeaders(){
    this.orderService.getAllOrderHeaders().subscribe(response => {
      this.orders = response;
    })
  }

}
