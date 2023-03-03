import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ProductCreationModel } from '../_models/product/product-creation.model';
import { ProductEditionModel } from '../_models/product/product-edition.model';
import { ProductSelectionModel } from '../_models/product/product-selection.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl = environment.baseUrl + 'Products/';
  
  constructor(private http: HttpClient, private router: Router) { }

  getAllProducts(){
    return this.http.get<ProductSelectionModel[]>(this.baseUrl + 'GetAllProducts');
  }

  getProduct(id: number){
    return this.http.get<ProductSelectionModel>(this.baseUrl + 'GetProduct/' + id);
  }

  CreateProduct(productCreationModel: ProductCreationModel){
    return this.http.post(this.baseUrl + 'CreateProduct/', productCreationModel);
  }

  UpdateProduct(productEditionModel: ProductEditionModel){
    return this.http.put(this.baseUrl + 'UpdateProduct/', productEditionModel);
  }
}
