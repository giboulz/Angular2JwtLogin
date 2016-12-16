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
import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { HttpInterceptor } from './login/HttpInterceptor.service';
import { AppRequestOptions, WEBAPI_URL_TOKEN } from './login/app.request.options';
import { TokenAuthService } from './token-auth.service'; 

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
      provide: Http, useFactory: (backend: XHRBackend, defaultOptions: RequestOptions, tokenAuthService: TokenAuthService) => {
        return new HttpInterceptor(backend, defaultOptions, tokenAuthService);
      },
      deps: [XHRBackend, RequestOptions, TokenAuthService]
    },
    { provide: WEBAPI_URL_TOKEN, useValue: 'http://localhost:8080/' },
    { provide: RequestOptions, useClass: AppRequestOptions }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
