import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
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
        this.router.navigate(['/layout/userList']);
      });
  }

  onSubmit() {
    console.log(this.role);
    this.createRole(); // Call the "createUser" method with parentheses
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
