import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { PasswordRequestUtilnewpassword } from '../../models/PasswordRequestUtilnewpassword';
import { Router } from '@angular/router';

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
  
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router:Router
    ) { }
    
  resetPassword(){
    this.authService.resetPassword(this.requestnewpassword).subscribe({
      next:(response)=>{
        console.log('response ', response);
        this.requestnewpassword=response;
      }

    })
    this.router.navigate(['login']);

  }

}
