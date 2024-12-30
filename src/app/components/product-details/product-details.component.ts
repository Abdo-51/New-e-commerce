import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { product } from '../../interfaces/product';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  id : any;
  product !: product;

private _ActivatedRoute:ActivatedRoute = inject(ActivatedRoute);
private readonly _ProductService:ProductsService = inject(ProductsService);

ngOnInit(){

    this._ActivatedRoute.paramMap.subscribe({
    next : (param) =>{
    this.id = param.get('id'); 
    }
  })
  this.getProductDetails(this.id);
}


getProductDetails = (id:string) =>{
this._ProductService.getProduct(id).subscribe({
  next: (res) =>{
    this.product = res.data ;
    console.log(res.data)
  },
  error: (err) =>{
    console.log(err);
  }
})
}





}
