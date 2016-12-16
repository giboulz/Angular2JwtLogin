import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { AuthenticationService } from './authentication.service';
import { User } from './current-user/user';
import { TokenAuthService } from './token-auth.service';

@Injectable()
export class CurrentUserService {

  constructor(private http: Http,
    private authenticationService: AuthenticationService,
    private tokenAuthService: TokenAuthService) { }



  getCurrentUser(): Observable<User> {

    let authHeader = new Headers();
    //authHeader.append('Authorization', this.authenticationService.token);
    authHeader.append('Authorization', this.tokenAuthService.token);


    // get user from api
    return this.http.get('http://localhost:8080/currentUserFromToken', { headers: authHeader })
      .map((response: Response) => {
        return response.json()
      });
  }
}
