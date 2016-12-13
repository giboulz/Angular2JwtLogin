
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component'; 
import {CurrentUserComponent} from './current-user/current-user.component'; 
import { AuthGuardService } from './auth-guard.service';


const appRoutes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'user' , component: CurrentUserComponent, canActivate:[AuthGuardService]},
    { path: '**', redirectTo: 'login' }  
]; 


@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
