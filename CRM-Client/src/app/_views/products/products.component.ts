import { Component, OnInit } from '@angular/core';
import { ProductSelectionModel } from 'src/app/_models/product/product-selection.model';
import { ProductsService } from 'src/app/_services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products!: ProductSelectionModel[];

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productService.getAllProducts().subscribe(response => {
      this.products = response;
    });
  }

}
