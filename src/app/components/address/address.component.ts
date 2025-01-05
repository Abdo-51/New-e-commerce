import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss'
})
export class AddressComponent {
cardId :string = '';

private readonly _FormBuilder = inject(FormBuilder);
private readonly _OrderService = inject(OrderService);
private readonly _ActivateRoute = inject(ActivatedRoute);



address : FormGroup = this._FormBuilder.group({
  details: [null],
  phone : [null],
  city: [null],
});


ngOnInit(){
  this._ActivateRoute.paramMap.subscribe({
    next:(params) => {
      this.cardId = params.get('id')!
    }
  })
}
Payment = () =>{

  console.log(this.address.value);

    this._OrderService.createSession( this.cardId , this.address.value).subscribe({
      next: (res : any) =>{
        console.log(res);
        window.location.href = res.session.url
      },
      error: (err: any) =>{
        console.error(err);
      }
    })
  }

}
