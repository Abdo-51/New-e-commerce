import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from "../../shared/ui/button/button.component";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ButtonComponent , ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

    registerForm = new FormGroup({
      name:new FormControl(null , [Validators.required , Validators.minLength(2) , Validators.maxLength(20)]),
      email:new FormControl(null , [Validators.required , Validators.email]),
      password:new FormControl(null , [Validators.required , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
      rePassword:new FormControl(null),
    }, this.confirmPassword)

    confirmPassword(g : AbstractControl){
     return g.get('password')?.value == g.get('rePassword')?.value ? null : { mismatch : true}

    }
    register(){
      console.log(this.registerForm);
    }
}
