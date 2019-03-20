import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule,Router } from '@angular/router';
 
import { AuthModule } from '../auth/auth.module';

const routes: Routes = [   
    {path: 'auth', loadChildren: '../auth/auth.module#AuthModule'},
    // {path: 'register', loadChildren: '../register/register.module#RegisterModule'},
    // {path: 'login', loadChildren: '../pages/login/login.module#LoginModule'},
    // {path: 'editor', loadChildren: '../editor/editor.module#EditorModule'},
    {path: 'login', loadChildren: '../pages/login/login.module#LoginModule'},
    // {path: '**', redirectTo: 'auth/dashboard'},
    {path: '**', redirectTo: '../login'},
    
    
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class LazyLoadModule {
    constructor(private router:Router){
        if(localStorage.getItem('Token') != undefined || localStorage.getItem('Token') != null){
            this.router.navigate(['/auth/dashboard']);
          } else {
            this.router.navigate(['../login']);
          }
    }
 }
