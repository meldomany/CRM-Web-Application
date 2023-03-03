import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerCreationModel } from 'src/app/_models/customer/customer-creation.model';
import { CustomersService } from 'src/app/_services/customers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent implements OnInit {

  customerForm = this.fb.group({
    code: ['', { Validators: [ Validators.required, Validators.minLength(5), Validators.maxLength(15) ] }],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', { Validators: [ Validators.required, Validators.email] }],
    phone: [''],
    status: [true, Validators.required],
    addresses: this.fb.array([])
  });

  constructor(private customersService:CustomersService, private router: Router, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.addAddress();
  }

  get addresses() {
    return this.customerForm.controls["addresses"] as FormArray;
  }

  addAddress() {
    const addressForm = this.fb.group({
        line1: ['', Validators.required],
        line2: [''],
        country: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        postalCode: [''],
        addressType: ['', Validators.required],
        shippingAddress: [''],
        billingAddress: ['']
    });

    this.addresses.push(addressForm);
  }

  removeAddress(addressIndex: number) {
    this.addresses.removeAt(addressIndex);
  }

  formSubmition(){

    this.customerForm.controls["addresses"].controls.forEach(element => {
      if(element.get('addressType')?.value == 'shipping'){
        element.get('shippingAddress')?.setValue(true);
        element.get('billingAddress')?.setValue(false);
      }else{
        element.get('billingAddress')?.setValue(true);
        element.get('shippingAddress')?.setValue(false);
      }
    });
  
    const customerCreationModel = this.customerForm.value as CustomerCreationModel;
    this.customersService.CreateCustomer(customerCreationModel).subscribe(() => {
      this.router.navigateByUrl('/customers');
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'New customer created successfully',
        showConfirmButton: false,
        timer: 1500
      });
    });
    
  }
}
