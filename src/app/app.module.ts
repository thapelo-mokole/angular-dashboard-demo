import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule,Router } from '@angular/router';
import { AppComponent } from './app.component';
import { LazyLoadModule } from './lazy-load/lazy-load.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import {WebApi} from './../../api/api.constant';



@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    LazyLoadModule,
    CoreModule,
    BrowserAnimationsModule
  ],
  providers: [WebApi],
  bootstrap: [AppComponent]
})
export class AppModule { 

  constructor(private router: Router){
   
    if(localStorage.getItem('Token') != undefined || localStorage.getItem('Token') != null){
      this.router.navigate(['/auth/dashboard']);
      
    } else {
      this.router.navigate(['../login']);
    }
  }
}
