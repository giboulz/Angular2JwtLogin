import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';
import { ButtonsModule } from 'ng2-bootstrap/ng2-bootstrap';
import { Router } from '@angular/router'; 
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app.routing';
import { CurrentUserComponent } from './current-user/current-user.component';
import { AuthenticationService } from './login/authentication.service';
import { AuthGuardService } from './services/auth-guard.service';
import { CurrentUserService } from './current-user/current-user.service';
import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { HttpInterceptor } from './login/HttpInterceptor.service';
import { AppRequestOptions, WEBAPI_URL_TOKEN } from './login/app.request.options';
import { TokenAuthService } from './login/token-auth.service'; 



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
    CurrentUserService,
    TokenAuthService,
    {
      provide: Http, useFactory: (backend: XHRBackend, defaultOptions: RequestOptions, tokenAuthService: TokenAuthService, router : Router) => {
        return new HttpInterceptor(backend, defaultOptions, tokenAuthService, router);
      },
      deps: [XHRBackend, RequestOptions, TokenAuthService, Router]
    },
    { provide: WEBAPI_URL_TOKEN, useValue: 'http://localhost:8080/' },
    { provide: RequestOptions, useClass: AppRequestOptions }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
