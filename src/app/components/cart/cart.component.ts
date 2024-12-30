import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  counter = signal(0);
  actionList: string[] = [];


  increment(){
    // this.counter++;.
    this.counter.set(this.counter() + 1)
    this.actionList.push('increment');
  }

  decrease(){
    // this.counter--;
    this.counter.set(this.counter() - 1)

    this.actionList.push('decrease');
  }

}
