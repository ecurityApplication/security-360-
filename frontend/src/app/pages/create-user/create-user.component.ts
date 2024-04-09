import { Component, Inject } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { NgToastService } from 'ng-angular-popup';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
  user: User = new User();
  id!: number;
  
  constructor(
    private userService:UserService,
    private router:Router,
    private toast: NgToastService,
    public dialogRef: MatDialogRef<CreateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  createUser() {
    this.userService.createUser(this.user).subscribe(
      user => {
       // console.log('User created successfully:', user);
        console.log(this.user); 
        this.showSuccess();
        this.dialogRef.close();
        this.goToUserList();
      },
      error => {
        console.error('Error creating user:', error);
      }
    );
  }

  goToUserList() {
    //this.router.navigate(['/userList']);
      // Navigate back to the same route to force component reload
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/userList']);
      });
  }

  onSubmit() {
    console.log(this.user);
    this.createUser(); // Call the "createUser" method with parentheses
  }

  showSuccess() {
    this.toast.success({
      detail:"Success Message",
      summary:"Successfully added a new user",
      duration:2000,
       position:'topRight'})
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
