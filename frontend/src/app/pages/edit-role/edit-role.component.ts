import { Component, Inject } from '@angular/core';
import { Role } from '../../models/role';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoleService } from '../../service/role.service';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrl: './edit-role.component.css',
})
export class EditRoleComponent {
  constructor(
    private roleService: RoleService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<EditRoleComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { role: Role }
  ) {}

  role: Role = new Role();
  ngOnInit(): void {
    this.role = Object.assign({}, this.data.role); // Create a copy for editing
  }

  onSubmit(): void {
    this.roleService.updateRole(this.role.id, this.role).subscribe(
      () => {
        this.dialogRef.close(this.role); // Close dialog with updated user data
      },
      (error) => {
        console.error('Error updating role:', error);
        // Handle update error (e.g., show error message)
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
