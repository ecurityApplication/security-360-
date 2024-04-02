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
  this.userService.getAnalysteList().subscribe((data :Analyste[] )=> {
    this.analyste = data;
  });
}
}
