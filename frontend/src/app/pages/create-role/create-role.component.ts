import { Component, Inject } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Role } from '../../models/role';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrl: './create-role.component.css'
})
export class CreateRoleComponent {
  role: Role = new Role();
  constructor(
    private userService:UserService,
    private router:Router,
    private toast: NgToastService,
    public dialogRef: MatDialogRef<CreateRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
  onSubmit() {
  }
}
