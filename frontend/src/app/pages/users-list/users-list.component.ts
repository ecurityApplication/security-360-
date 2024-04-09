import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { CreateUserComponent } from '../create-user/create-user.component';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent implements OnInit {

  user: User[] = [];
  id!:number;
  // user: User = {
  //   id:0,
  //   username: '',
  //   email: '',
  //   password: '',
  //   roleName: '',
    
  // };
  constructor(private userService: UserService, private router: Router,public dialog: MatDialog) {}

  ngOnInit(): void {
    
    // Call the method to fetch users on component initialization
    this.getUser();
  }

  getUser() {
    this.userService.getUser().subscribe(
      (user) => {
        this.user = user;
        console.log(this.user);
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

    //open dialog for editing
//   openEdite(){
// this.dialog.open(EditUserComponent,{
//   width: "40%",
//   height:"60%",
// });
// } 
//  updateUser(id: number): void {
//     this.openEdite();
//      this.router.navigate(['update-user', id]);
//   }
openEditDialog(id: number): void {
  const dialogRef = this.dialog.open(EditUserComponent, {
    width: '40%',
    height: '60%',
    data: { id: id } // Pass the user ID to the dialog
    
    
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    // Handle any actions after the dialog is closed
  });
}
}

