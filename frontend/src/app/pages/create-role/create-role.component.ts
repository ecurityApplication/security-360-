import { Component, Inject } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Role } from '../../models/role';
import Swal from 'sweetalert2';
import { RoleService } from '../../service/role.service';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrl: './create-role.component.css'
})
export class CreateRoleComponent {
  role: Role = new Role();
  constructor(
    private roleService:RoleService,
    private router:Router,
    private toast: NgToastService,
    public dialogRef: MatDialogRef<CreateRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
  createRole() {
    this.roleService.createrole(this.role).subscribe(
      role => {
       // console.log('User created successfully:', user);
        console.log(this.role); 
        //this.showSuccess();
        Swal.fire('Success!', 'User added successfully.', 'success');
        this.dialogRef.close();
        this.goToUserList();
      },
      error => {
        console.error('Error creating role:', error);
        Swal.fire('Error!', 'Failed to create role.', 'error');
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
    console.log(this.role);
    this.createRole(); // Call the "createUser" method with parentheses
  }
  
}
