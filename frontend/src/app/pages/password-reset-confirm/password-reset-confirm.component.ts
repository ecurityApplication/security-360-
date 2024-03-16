import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { PasswordRequestUtilnewpassword } from '../../models/PasswordRequestUtilnewpassword';

@Component({
  selector: 'app-password-reset-confirm',
  templateUrl: './password-reset-confirm.component.html',
  styleUrl: './password-reset-confirm.component.css'
})
export class PasswordResetConfirmComponent {
  requestnewpassword : PasswordRequestUtilnewpassword={
    newPassword:'',
    codeemail: ''
  };
  password: string = '';
  codeEmail: string = '';
  constructor(
    private authService: AuthService,
    private toastr: ToastrService
    ) { }
    
  resetPassword(){
    this.authService.resetPassword(this.codeEmail,this.password).subscribe({
      next:(response)=>{
        console.log('response ', response);
        this.toastr.success(
          'Check your email'
        );
      }
    })
  }
}
