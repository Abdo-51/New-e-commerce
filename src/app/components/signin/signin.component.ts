import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ButtonComponent , ReactiveFormsModule , NgClass , RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  private _AuthService = inject(AuthService);
  // private _formBuilder = inject(FormBuilder);
  private _router = inject(Router);
  showPassword : boolean = false;
  showRePassword : boolean = false;
  loading : boolean = false;
  errorMessage:string = "";



  loginForm : FormGroup = new FormGroup({
    email:new FormControl(null , [Validators.required , Validators.email]),
    password:new FormControl(null , [Validators.required , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
  })


  toggleShowPassword(field: 'password') {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } 
  }

  login(){
    this.loading = true;
    if (this.loginForm.valid) {
    this._AuthService.signIn(this.loginForm.value).subscribe({
      next:(res)=>{
        if (res.message == 'success') {   
          localStorage.setItem('token', res.token)  
          this._AuthService.saveUserData();
          this._router.navigate(['/home']);
          this.loading = false;
          console.log(res);
        }
        
      },
      error:(err)=>{
        this.errorMessage = err.error.message;
        console.log(err.error.message);
        this.loginForm.markAllAsTouched();
        this.loading = false;
      }
    })
  }
}
}



