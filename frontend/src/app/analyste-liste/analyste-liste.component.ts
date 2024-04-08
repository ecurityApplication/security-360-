import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Analyste } from '../models/analyste';
import { Router } from '@angular/router';

@Component({
  selector: 'app-analyste-liste',
  templateUrl: './analyste-liste.component.html',
  styleUrl: './analyste-liste.component.css'
})
export class AnalysteListeComponent implements OnInit {
  constructor(private userService: UserService, private router:Router){ }
  analyste: Analyste []= [];
  ngOnInit(): void {
    this.getAnalyste()
  
    // this.userService.getAnalysteList().subscribe((data :Analyste[] )=> {
    //   this.analyste = data;
    // });
  }

deleteAnalyste(id: number) {
  this.userService.deleteAnalyste(id).subscribe(data => {
    // console.log(data);
    this.getAnalyste();
  })
}
  getAnalyste() {
    this.userService.getAnalysteList().subscribe(data=>{
      // console.log(this.incidents);
       this.analyste = data;
       
     } , error => {
      console.error(error)
     })

  }


}
