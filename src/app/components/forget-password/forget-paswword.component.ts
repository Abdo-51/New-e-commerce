import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { NgClass } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forget-paswword',
  standalone: true,
  imports: [ButtonComponent , ReactiveFormsModule , NgClass ],
  templateUrl: './forget-paswword.component.html',
  styleUrl: './forget-paswword.component.scss'
})
export class ForgetPaswwordComponent {
  private _AuthService = inject(AuthService);
  private _router = inject(Router);

  steps = 1 ;
  showPassword : boolean = false;
  loading : boolean = false;
  errorMessage:string = "";

  forgetpasswordForm : FormGroup = new FormGroup({
    email:new FormControl(null , [Validators.required , Validators.email]),
  });

  verifyResetCode : FormGroup = new FormGroup({
    resetCode:new FormControl(null , [Validators.required]),
  });

  resetPassword : FormGroup = new FormGroup({
    email:new FormControl(null , [Validators.required , Validators.email]),
    newPassword: new FormControl(null , [Validators.required ])
  });


  toggleShowPassword(field: 'password') {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } 
  }

  forgetPassword(){
    this.loading = true;
    if (this.forgetpasswordForm.valid) {
      this._AuthService.forgetPassword(this.forgetpasswordForm.value).subscribe({
      next:(res)=>{
        this.steps = 2;
        this.loading = false;
        console.log(res);
      },
      error:(err)=>{
        this.errorMessage = err.error.message;
        console.log(err.error.message);
        this.forgetpasswordForm.markAllAsTouched();
        this.loading = false;
      }
    })
  }
}


  resetCode(){
    this.loading = true;
    if (this.verifyResetCode.valid) {
    this._AuthService.verifyResetCode(this.verifyResetCode.value).subscribe({
      next:(res)=>{
        this.steps = 3;
        this.loading = false;
        console.log(res);
      },
      error:(err)=>{
        this.errorMessage = err.error.message;
        console.log(err.error.message);
        this.verifyResetCode.markAllAsTouched();
        this.loading = false;
      }
    })
  }
}

  newPassword(){
    this.loading = true;
    if (this.resetPassword.valid) {
    this._AuthService.resetPassword(this.resetPassword.value).subscribe({
      next:(res)=>{
          this.loading = false;
          localStorage.setItem('token', res.token)  
          this._AuthService.saveUserData();
          this._router.navigate(['/home']);
      },
      error:(err)=>{
        this.errorMessage = err.error.message;
        console.log(err.error.message);
        this.resetPassword.markAllAsTouched();
        this.loading = false;
      }
    })
  }
}

}
