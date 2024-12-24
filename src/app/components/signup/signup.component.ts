import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from "../../shared/ui/button/button.component";
import { NgClass } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ButtonComponent , ReactiveFormsModule , NgClass ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
    private _AuthService = inject(AuthService);
    // private _formBuilder = inject(FormBuilder);
    private _router = inject(Router);
    showPassword : boolean = false;
    showRePassword : boolean = false;
    loading : boolean = false;
    errorMessage:string = "";


    registerForm : FormGroup = new FormGroup({
      name:new FormControl(null , [Validators.required , Validators.minLength(2) , Validators.maxLength(20)]),
      email:new FormControl(null , [Validators.required , Validators.email]),
      password:new FormControl(null , [Validators.required , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
      rePassword:new FormControl(null),
    }, this.confirmPassword)

    //   registerForm :FormGroup = this._formBuilder.group({
    //     name:[null , [Validators.required , Validators.minLength(2) , Validators.maxLength(20)]],
    //     email:[null ,  [Validators.required , Validators.email]],
    //     password:[null ,  [Validators.required , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
    //     rePassword:[null , Validators.required]
    //   },
    // {Validators:[this.confirmPassword]});


    confirmPassword(g : AbstractControl){
     return g.get('password')?.value === g.get('rePassword')?.value ? null : { mismatch : true}

    }

    toggleShowPassword(field: 'password' | 'rePassword') {
      if (field === 'password') {
        this.showPassword = !this.showPassword;
      } else if (field === 'rePassword') {
        this.showRePassword = !this.showRePassword;
      }
    }
    register(){
      this.loading = true;
      if (this.registerForm.valid) {
        this._AuthService.signUp(this.registerForm.value).subscribe({
          next:(res)=>{
            if (res.message == 'success') { 
              this._router.navigate(['/signin']);
              this.loading = false;
              console.log(res);
            }
            
          },
          error:(err)=>{
            this.errorMessage = err.error.message;
            console.log(err.error.message);
            this.registerForm.markAllAsTouched();
            this.loading = false;
          }
        })
      }
    }
}
