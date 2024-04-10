import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { CreateUserComponent } from '../create-user/create-user.component';
import { CreateRoleComponent } from '../create-role/create-role.component';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent implements OnInit {

  user: User[] = [];
  id!:number;

  constructor(private userService: UserService, private router: Router,public dialog: MatDialog) {}

  ngOnInit(): void {
    // Call the method to fetch users on component initialization
    this.getUser();
  }

  getUser() {
    this.userService.getUser().subscribe(
      (user) => {
        this.user = user;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteUser(id: number) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        // Call the deleteUser method when the user confirms
        this.userService.deleteUser(id).subscribe(() => {
          // Show success message
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
          // Refresh user data after deletion
          this.getUser();
        }, (error) => {
          // Handle error if deletion fails
          console.error("Error deleting user:", error);
          Swal.fire({
            title: "Error",
            text: "Failed to delete user.",
            icon: "error"
          });
        });
      }
    });
  }
  
  //open dialog for creating
  openCreate(){
  this.dialog.open(CreateUserComponent,{
    width: "40%",
    height:"60%",
  });
  } 
  openCreaterole(){
    this.dialog.open(CreateRoleComponent,{
      width: "30%",
      height:"30%",
    });
    } 

openEditDialog(user: User): void {
  const dialogRef = this.dialog.open(EditUserComponent, {
    width: '40%',
    height: '60%',
    data: { user } // Pass the entire user object for editing
  });

  dialogRef.afterClosed().subscribe(updatedUser => {
    if (updatedUser) { // Check if user was updated in the dialog
      this.userService.updateUser(updatedUser.id, updatedUser).subscribe(
        () => {
          this.getUser(); // Refresh user list after successful update
          Swal.fire('Success!', 'User updated successfully.', 'success');
        },
        (error) => {
          console.error('Error updating user:', error);
          Swal.fire('Error!', 'Failed to update user.', 'error');
        }
      );
    }
  });
}

}

