import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit{
  // Initialize users as an array
  user : User[] = [];
   // Inject UserService
  constructor(private userService: UserService, private router:Router){ 
  }

  ngOnInit():void {
     // Call the method to fetch users on component initialization
this.getUser();
  }
 
  getUser(){
    this.userService.getUser().subscribe(user =>{
     
      
      // Assign fetched users to the local array
      this.user=user;
      console.log(this.user); 
    }, error => {
      console.error(error)
     }
    );
  }

  
  
  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(data => {
      console.log("hi");
       console.log(data);
      this.getUser();
    })
}


}
