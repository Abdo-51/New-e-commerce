import { Component, inject, signal } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../interfaces/cart';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  isloading : boolean = false;
  cart : Cart = {} as Cart;

 private readonly _CartService = inject(CartService);
 private readonly toastr = inject(ToastrService);


 ngOnInit(){
  this.getLoggedUserCart();
 }

 getLoggedUserCart = () => {
  this._CartService.getLoggedUserCart().subscribe({
    next: (res) => {
      this.isloading = true;
    console.log(res);
    this.cart = res
    },error: (err) => {
      console.log(err);
      
    }
  })
}

deleteItem = (productId : string) =>{
  this._CartService.removeItem(productId).subscribe({
    next: (res) =>{
      console.log(res);
      this.toastr.success('Product Deleted Successfully','', {
        progressBar: true , 
        progressAnimation: 'increasing'
      }) 
      this.cart = res;
    },error: (err) => {
      console.log(err);
    }
  })
}

updateQTY = (productId : string , count: number) =>{
  this._CartService.updateProduct(productId , count).subscribe({
    next: (res) =>{
      console.log(res);
      this.toastr.success('Product Updateded Successfully','', {
        progressBar: true , 
        progressAnimation: 'increasing'
      }) 
      this.cart = res;
    },error: (err) => {
      console.log(err);
    }
  })
}


}
     