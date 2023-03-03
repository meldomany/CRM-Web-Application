import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormArray, FormGroup, AbstractControl } from '@angular/forms';
import { AddressSelectionModel } from 'src/app/_models/address/address-selection.model';
import { ProductSelectionModel } from 'src/app/_models/product/product-selection.model';
import { CustomerSelectBoxModel } from 'src/app/_models/customer/customer-selectbox.model';
import { AddressesService } from 'src/app/_services/addresses.service';
import { CustomersService } from 'src/app/_services/customers.service';
import { ProductsService } from 'src/app/_services/products.service';
import { OrdersService } from 'src/app/_services/orders.service';
import { OrderHeaderCreationModel } from 'src/app/_models/order-header/order-header-creation.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {

  customers!: CustomerSelectBoxModel[];
  customerShippingAddresses!: AddressSelectionModel[];
  customerBillingAddresses!: AddressSelectionModel[];
  products!: ProductSelectionModel[];

  orderForm = this.fb.group({
    status: [true , Validators.required],
    tax: [14, { Validators: [ Validators.required, Validators.pattern("[1-100]") ]}],
    subTotal: [0, { Validators: [ Validators.required ]}],
    grandTotal: [0, { Validators: [ Validators.required ]}],
    date: [new Date(), { Validators: [ Validators.required ]}],
    customerId: [0, { Validators: [ Validators.required ]}],
    shippingAddressId: [0, { Validators: [ Validators.required ]}],
    billingAddressId: [0, { Validators: [ Validators.required ]}],
    orderDetails: this.fb.array([])
  });

  constructor(private fb:FormBuilder, 
    private router: Router,
    private orderService: OrdersService,
    private customerService: CustomersService,
    private addressService: AddressesService,
    private productService: ProductsService) { }

  ngOnInit(): void {
    this.getCustomers();
    this.getProducts();
  }

  get orderDetails() {
    return this.orderForm.controls["orderDetails"] as FormArray;
  }

  addOrderDetails() {
    const orderDetailsForm = this.fb.group({
        lineNo: [0 , { Validators: [ Validators.required] } ],
        price: [0 , { Validators: [ Validators.required] } ],
        quantity: [0 , { Validators: [ Validators.required] } ],
        taxAmount: [0 , { Validators: [ Validators.required] } ],
        totalPrice: [0 , { Validators: [ Validators.required] } ],
        productId: [0 , { Validators: [ Validators.required] } ]
    });

    this.orderDetails.push(orderDetailsForm);
  }

  removeOrderDetails(orderDetailsIndex: number) {
    this.orderDetails.removeAt(orderDetailsIndex);
    this.updateGrandTotal();
  }


  getCustomers(){
    return this.customerService.getAllCustomersSelectBox().subscribe(response => {
      this.customers = response;
    });
  }

  customerSelected(){
    const customerId = this.orderForm.get('customerId')?.value as number;
    if(customerId > 0){
      this.addressService.getAllShippingAddresses(customerId).subscribe(response => {
        this.customerShippingAddresses = response;
        this.addressService.getAllBillingAddresses(customerId).subscribe(response => {
          this.customerBillingAddresses = response;
        });
      });
    }
  }

  getProducts(){
    this.productService.getAllProducts().subscribe(response => {
      this.products = response;
    });
  }
  
  updateProductPrice(index: number){
    var control = this.orderDetails.controls[index] as FormGroup;
    var productId = this.orderDetails.value[index].productId;
    control.get('price')?.setValue(this.products.find(p => p.id == productId)?.price);
  }

  updateTotalPrice(index: number){
    var orderDetail = this.orderDetails.controls[index] as FormGroup;
    var productId = this.orderDetails.value[index].productId;
    var productPrice = this.products.find(p => p.id == productId)?.price as number;

    var totalPrice = productPrice * orderDetail.get('quantity')?.value;
    if(orderDetail.get('taxAmount')?.value == 0){
      orderDetail.get('totalPrice')?.setValue(totalPrice);
    }else {
      var totalPriceTax = totalPrice * (orderDetail.get('taxAmount')?.value / 100);
      orderDetail.get('totalPrice')?.setValue(totalPrice + totalPriceTax);
    }

    this.updateGrandTotal();
  }

  updateGrandTotal(){
    let subtotal = 0;
    var orderDetails = this.orderDetails.controls as [FormGroup];
    orderDetails.forEach(order => {
      subtotal += order.get('totalPrice')?.value;
    });

    this.orderForm.get('subTotal')?.setValue(subtotal);
    var vatFromSubTotal = subtotal * (14 / 100);
    this.orderForm.get('grandTotal')?.setValue(subtotal - vatFromSubTotal);
  }

  orderFormSubmition(){
    var orderHeaderCreationMode = this.orderForm.value as OrderHeaderCreationModel;
    this.orderService.CreateOrderHeader(orderHeaderCreationMode).subscribe(() => {
      this.router.navigateByUrl('/orders');
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Order created successfully',
        showConfirmButton: false,
        timer: 1500
      });
    });
  }
}
