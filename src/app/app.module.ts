import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';
import { ButtonsModule } from 'ng2-bootstrap/ng2-bootstrap';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app.routing';
import { CurrentUserComponent } from './current-user/current-user.component';
import { AuthenticationService } from './authentication.service';
import { AuthGuardService } from './auth-guard.service';
import { CurrentUserService } from './current-user.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CurrentUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModule,
    ButtonsModule,
    AppRoutingModule
  ],
  providers: [
    AuthenticationService,
    AuthGuardService,
    CurrentUserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
