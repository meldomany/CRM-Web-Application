import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCreationModel } from 'src/app/_models/product/product-creation.model';
import { ProductEditionModel } from 'src/app/_models/product/product-edition.model';
import { ProductsService } from 'src/app/_services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modification',
  templateUrl: './modification.component.html',
  styleUrls: ['./modification.component.scss']
})
export class ModificationComponent implements OnInit {

  productId: any = 0;

  productForm = this.fb.group({
    name: ['', { Validators: [ Validators.required, Validators.minLength(5), Validators.maxLength(15) ] }],
    description: ['', Validators.required],
    price: [ 0, { Validators: [ Validators.required] } ]
  });

  constructor(private route: ActivatedRoute, 
    private fb:FormBuilder, 
    private productService: ProductsService,
    private router: Router) { }

  ngOnInit(): void {
    if(this.route.snapshot.params['productId'] > 0){
      this.productId = this.route.snapshot.params['productId'];
      this.getProductDetails(this.productId);
    }
  }

  getProductDetails(productId: any){
    (this.productForm as FormGroup).addControl('id', this.fb.control(productId, Validators.required));
    this.productService.getProduct(productId).subscribe(response => {
      this.productForm.patchValue({
        name: response.name,
        description: response.description,
        price: response.price
      })
    });
  }

  ProductFormSubmition(){
    if(this.productId > 0){
      const productEditionModel = this.productForm.value as ProductEditionModel;
      //update
      this.productService.UpdateProduct(productEditionModel).subscribe(() => {
        this.router.navigateByUrl('/products');
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Product updated successfully',
          showConfirmButton: false,
          timer: 1500
        });
      });
    }else {
      //create
      const productCreationModel = this.productForm.value as ProductCreationModel;
      this.productService.CreateProduct(productCreationModel).subscribe(() => {
        this.router.navigateByUrl('/products');
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Product created successfully',
          showConfirmButton: false,
          timer: 1500
        });
      });
    }
  }
}
