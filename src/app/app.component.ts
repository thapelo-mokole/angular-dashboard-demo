import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
} from '@angular/animations'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  

})
export class AppComponent {
  title = 'app';
  getRouteAnimation(outlet) {
      return outlet.activatedRouteData.animation
  }
  constructor(private router:Router){
    if(localStorage.getItem('Token') != undefined || localStorage.getItem('Token') != null){
      this.router.navigate(['auth/dashboard']);
      
    } else {
      this.router.navigate(['../login']);
    }
    
  }
}
