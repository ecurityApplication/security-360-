import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { NgToastService } from 'ng-angular-popup';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Role } from '../../models/role';
import { RoleService } from '../../service/role.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent  implements OnInit {
 // user: User = new User();
 roleName!:string[]
newUser : User = new User();
  id!: number;
  roles:Role[]=[];
  constructor(
    private userService:UserService,
    private router:Router,
    private toast: NgToastService,
    public dialogRef: MatDialogRef<CreateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roleService :RoleService
  ) {}

  ngOnInit(): void {
    this.getRole();
  }
  createUser() {
    console.log(this.newUser);
    this.userService.createUser(this.newUser).subscribe(
      user => {
       console.log('User created successfully:', user);

        //console.log(this.user); 
       // this.users.push(user);
        //this.showSuccess();
        Swal.fire('Success!', 'User added successfully.', 'success');
        this.dialogRef.close();
        this.goToUserList();
      },
      error => {
        console.error('Error creating user:', error);
        Swal.fire('Error!', 'Failed to create user.', 'error');
      }
    );
  }
  pushRole(role:string) {
    this.roleName.push(role);
    console.log("roleName",this.roleName);
  }
  getRole() {
    this.roleService.getRole().subscribe(
      (res) => {
        this.roles = res;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  goToUserList() {
      // Navigate back to the same route to force component reload
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/userList']);
      });
  }

  onSubmit() {
    console.log(this.newUser);
    this.createUser(); // Call the "createUser" method with parentheses
  }

  // showSuccess() {
  //   this.toast.success({
  //     detail:"Success Message",
  //     summary:"Successfully added a new user",
  //     duration:2000,
  //      position:'topRight'})
  // }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
