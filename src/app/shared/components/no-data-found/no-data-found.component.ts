import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-data-found',
  standalone: true,
  imports: [],
  templateUrl: './no-data-found.component.html',
  styleUrl: './no-data-found.component.scss'
})
export class NoDataFoundComponent {

  constructor(private router:Router){

  }

  goToStaffManagement(){
    this.router.navigate(['staff']);
  }
}
