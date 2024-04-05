import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
  user: User = new User();

  constructor(private userService: UserService, private router: Router) {} // Inject your UserService

  createUser() {
    this.userService.createUser(this.user).subscribe(
      response => {
        console.log('User created successfully:', response);
        this.goToUserList();
      },
      error => {
        console.error('Error creating user:', error);
      }
    );
  }

  goToUserList() {
    this.router.navigate(['/userList']);
  }

  onSubmit() {
    console.log(this.user);
    this.createUser(); // Call the "createUser" method with parentheses
  }
}
