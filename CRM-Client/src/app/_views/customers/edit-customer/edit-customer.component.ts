import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerEditionModel } from 'src/app/_models/customer/customer-edition.model';
import { CustomerSelectionModel } from 'src/app/_models/customer/customer-selection.model';
import { CustomersService } from 'src/app/_services/customers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {

  customerCode: any = '';
  customerSelectionModel!: CustomerSelectionModel;

  customerForm = this.fb.group({
    id: [0, Validators.required],
    code: ['', { Validators: [ Validators.required, Validators.minLength(5), Validators.maxLength(15) ] }],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', { Validators: [ Validators.required, Validators.email] }],
    phone: [''],
    status: [true, Validators.required],
    addresses: this.fb.array([])
  });

  constructor(private customersService:CustomersService,
    private router: Router,
    private fb:FormBuilder,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.customerDetails(this.route.snapshot.params['customerCode']);
  }

  customerDetails(customerCode: string) {
    this.customersService.getCustomer(customerCode).subscribe(response => {
      this.customerSelectionModel = response;

      this.customerForm.patchValue({
        id: response.id,
        code: response.code,
        firstName: response.firstName,
        lastName: response.lastName,
        email: response.email,
        phone: response.phone,
        status: response.status
      });

      response.addresses.forEach(address => {
        let addressType = 'shipping';
        if(address.shippingAddress){
          addressType = 'shipping';
        }else {
          addressType = 'billing';
        }

        this.addresses.push(this.fb.group({
          id: [address.id, Validators.required],
          line1: [address.line1, Validators.required],
          line2: [address.line2],
          country: [address.country, Validators.required],
          city: [address.city, Validators.required],
          state: [address.state, Validators.required],
          postalCode: [address.postalCode],
          addressType: [addressType, Validators.required],
          shippingAddress: [address.shippingAddress],
          billingAddress: [address.billingAddress],
          customerId: [address.customerId, Validators.required]
        }));
      });
    });
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

  removeAddressIndex(addressIndex: number) {
    this.addresses.removeAt(addressIndex);
  }

  removeAddress(addressId: number){

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.customersService.RemoveAddress(addressId).subscribe(() => {
          this.router.navigateByUrl('/customers');
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Address deleted successfully',
            showConfirmButton: false,
            timer: 1500
          });
        })
      }
    })
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
  
    const customerEditionModel = this.customerForm.value as CustomerEditionModel;
  
    this.customersService.UpdateCustomer(customerEditionModel).subscribe(() => {
      this.router.navigateByUrl('/customers');
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Customer updated successfully',
        showConfirmButton: false,
        timer: 1500
      });
    });
  }
}
