import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerModel } from 'src/app/_models/customer/customer.model';
import { CustomersService } from 'src/app/_services/customers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  customers: CustomerModel[] = [];

  constructor(private router: Router, private customerService: CustomersService) { }

  ngOnInit(): void {
    this.GetCustomers();
  }

  GetCustomers(){
    this.customerService.getAllCustomers().subscribe(response => {
      this.customers = response;
    });
  }
}
