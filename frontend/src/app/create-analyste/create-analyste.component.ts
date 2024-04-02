import { Component } from '@angular/core';
import { Analyste } from '../models/analyste';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-analyste',
  templateUrl: './create-analyste.component.html',
  styleUrl: './create-analyste.component.css'
})
export class CreateAnalysteComponent {
  constructor(private userService: UserService, private router:Router){ }

analyste: Analyste = new Analyste();

saveIncident(){

  this.userService.createAnalyste(this.analyste).subscribe( data =>{console.log(data);
  this.goToIncidentList();
},
error => console.log(error));

}
goToIncidentList(){
this.router.navigate(['/AnalysteListe']);
}
onSubmit() {
console.log(this.analyste);
this.saveIncident();
}
}
