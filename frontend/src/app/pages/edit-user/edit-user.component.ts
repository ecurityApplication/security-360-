import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user';
import { UserService } from '../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '../../models/role';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {

  user: User = new  User();
  id!:number;
  //roles: Role[]; // Array to store roles
  constructor(
    private userService:UserService,
    private router:Router,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { user: User } 
  ) {
  }
   ngOnInit(): void {
   // this.getRoles(); // Fetch roles on initialization
  this.user = Object.assign({}, this.data.user); // Create a copy for editing
}

// getRoles() {
//   this.userService.getRoles().subscribe(roles => this.roles = roles);
// }

  onSubmit(): void {
    this.userService.updateUser(this.user.id, this.user).subscribe(
      () => {
        this.dialogRef.close(this.user); // Close dialog with updated user data
      },
      (error) => {
        console.error('Error updating user:', error);
        // Handle update error (e.g., show error message)
      }
    );
  }

  onClose(): void {
    this.dialogRef.close(); // Close dialog without saving changes
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
