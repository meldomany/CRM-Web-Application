import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressSelectionModel } from 'src/app/_models/address/address-selection.model';
import { CustomerSelectBoxModel } from 'src/app/_models/customer/customer-selectbox.model';
import { OrderHeaderCreationModel } from 'src/app/_models/order-header/order-header-creation.model';
import { OrderHeaderEditionModel } from 'src/app/_models/order-header/order-header-edition.model';
import { ProductSelectionModel } from 'src/app/_models/product/product-selection.model';
import { AddressesService } from 'src/app/_services/addresses.service';
import { CustomersService } from 'src/app/_services/customers.service';
import { OrdersService } from 'src/app/_services/orders.service';
import { ProductsService } from 'src/app/_services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {

  customers!: CustomerSelectBoxModel[];
  customerShippingAddresses!: AddressSelectionModel[];
  customerBillingAddresses!: AddressSelectionModel[];
  products!: ProductSelectionModel[];
  
  orderForm = this.fb.group({
    id: [0, Validators.required],
    status: [true , Validators.required],
    tax: [14, Validators.required],
    subTotal: [0, Validators.required],
    grandTotal: [0, Validators.required],
    date: [new Date(), Validators.required],
    customerId: [0, Validators.required],
    shippingAddressId: [0, Validators.required],
    billingAddressId: [0, Validators.required],
    orderDetails: this.fb.array([])
  });

  constructor(private fb:FormBuilder, 
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrdersService,
    private customerService: CustomersService,
    private addressService: AddressesService,
    private productService: ProductsService) { }

  ngOnInit(): void {
    this.orderHeaderDetails(this.route.snapshot.params['orderId']);
    this.getCustomers();
    this.getProducts();
  }

  orderHeaderDetails(orderId: number){
    this.orderService.getOrderHeader(orderId).subscribe(response => {
      this.orderForm.patchValue({
        id: response.id,
        status: response.status,
        tax: response.tax,
        subTotal: response.subTotal,
        grandTotal: response.grandTotal,
        date: new Date(response.date),
        customerId: response.customerId,
        shippingAddressId: response.shippingAddressId,
        billingAddressId: response.billingAddressId
      });

      response.orderDetails.forEach(orderDetail => {
        this.orderDetails.push(this.fb.group({
          id: orderDetail.id,
          lineNo: orderDetail.lineNo,
          price: orderDetail.price,
          quantity: orderDetail.quantity,
          taxAmount: orderDetail.taxAmount,
          totalPrice: orderDetail.totalPrice,
          productId: orderDetail.productId
        }));
      });
    });
  }

  get orderDetails() {
    return this.orderForm.controls["orderDetails"] as FormArray;
  }

  addOrderDetails() {
    const orderDetailsForm = this.fb.group({
        lineNo: [0 , {Validators: [Validators.required] } ],
        price: [0 , {Validators: [Validators.required] } ],
        quantity: [0 , {Validators: [Validators.required] } ],
        taxAmount: [0 , {Validators: [Validators.required] } ],
        totalPrice: [0 , {Validators: [Validators.required] } ],
        productId: [0 , {Validators: [Validators.required] } ]
    });

    this.orderDetails.push(orderDetailsForm);
  }

  removeOrderDetails(orderDetailId: any){

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
        this.orderService.RemoveOrderDetail(orderDetailId).subscribe(() => {
          this.router.navigateByUrl('/orders');
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Order detail deleted successfully',
            showConfirmButton: false,
            timer: 1500
          });
        })
      }
    })
  }

  removeOrderDetailsIndex(orderDetailsIndex: number) {
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
    var orderEditionCreationMode = this.orderForm.value as OrderHeaderEditionModel;
    this.orderService.UpdateOrderHeader(orderEditionCreationMode).subscribe(() => {
      this.router.navigateByUrl('/orders');
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Order updated successfully',
        showConfirmButton: false,
        timer: 1500
      });
    });
  }
}