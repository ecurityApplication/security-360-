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
  user : User[] = [];
  constructor(private userService: UserService, private router:Router){ }
  ngOnInit():void {
this.getUser();
  }
 
  getUser(){
    this.userService.getUser().subscribe(user =>{
      this.user=user;
      console.log(this.user); 
    }, error => {
      console.error(error)
     }
    );
  }
  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(data => {
      // console.log(data);
      this.getUser();
    })
}
}
