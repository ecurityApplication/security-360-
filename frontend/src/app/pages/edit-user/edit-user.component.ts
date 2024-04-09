import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user';
import { UserService } from '../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {

  user: User = new  User();
  id!:number;
  
  constructor(
    private userService:UserService,
    private router:Router,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.id = data.id; // Assign the user ID from the dialog data
  }
   ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log('User ID:', this.id);
    
      this.userService.getUserById(this.id).subscribe(data => {
       console.log(data)
       this.user = data;
      }, error => console.log(error)
  )}
  onSubmit(): void {
    console.log("idon",this.id);
 this.userService.updateUser(this.id,this.user).subscribe(data =>{
//   console.log(data);
   this.goToUserList();
 }, error => console.log(error))
  }
   goToUserList(){
     this.router.navigate(['/userList']);
   }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
