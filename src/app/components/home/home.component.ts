import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { product } from '../../core/interfaces/product';
import { SliderComponent } from '../slider/slider.component';
import { CategorySliderComponent } from "../category-slider/category-slider.component";
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { SoldOutPipe } from '../../core/pipes/sold-out.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SliderComponent, CategorySliderComponent , RouterLink , DatePipe , UpperCasePipe , CurrencyPipe , SoldOutPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  allproducts: product [] = [];
  
  constructor(private _ProductsService:ProductsService , private toastr: ToastrService)
  {}
  private readonly _CartService:CartService = inject(CartService);
  
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
  
  addToCart = (productId: string) =>{
    this._CartService.addProductToCart(productId).subscribe({
      next: (res) => {
        console.log(res); 
        this.toastr.success(res.message , '', {
          progressBar: true , 
          progressAnimation: 'increasing'
        }) 
        
      },
      error: (err) =>{
        console.log(err);
        
      }
    })
  }
 }



