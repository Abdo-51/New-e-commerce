import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { product } from '../../interfaces/product';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  allproducts: product [] = [];
  
  constructor(private _ProductsService:ProductsService)
  {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts =() =>{
    this._ProductsService.getProducts().subscribe({
      next: (res) => {
        //  console.log(res.data);
         this.allproducts = res.data;
      },
    error: (error) => {
      console.log(error);
      }
    });
  };
  
}



