import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import {TokenAuthService} from './token-auth.service'


@Injectable()
export class AuthenticationService {
    public token: string;

    constructor(private http: Http, 
    private tokenAuthService : TokenAuthService ) {
        //set token if saved in local sotarge
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        //this.token = currentUser && currentUser.token;
        tokenAuthService.token = currentUser && currentUser.token;

    }

    login(user: string, password: string): Observable<boolean> {

        return this.http.post('http://localhost:8080/login', JSON.stringify({ username: user, password: password }))
            .map((response: Response) => {

                // login successful if there's a jwt token in the response
                let token = response.headers && response.headers.get('Authorization') && response.headers.get('Authorization').substring(7, response.headers.get('Authorization').length);

                if (token) {
                    // set token property
                    //this.token = token;
                    this.tokenAuthService.token = token; 

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: user, token: token }));

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });

    }

    logout(): void {
        console.log("logout ! ");
        //this.token = null;
        this.tokenAuthService.token = null; 
        localStorage.removeItem('currentUser');
    }
}
