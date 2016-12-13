import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationService {
    public token: string;

    constructor(private http: Http) {
        //set token if saved in local sotarge
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(user: string, password: string): Observable<boolean> {
        //TODO : remove
        user = '545505';
        password = 'Password01*';
        console.log(JSON.stringify({ username: user, password: password }));

        return this.http.post('http://localhost:8080/login', JSON.stringify({ username: user, password: password }))
            .map((response: Response) => {

                // login successful if there's a jwt token in the response
                let token = response.headers && response.headers.get('Authorization') && response.headers.get('Authorization').substring(7, response.headers.get('Authorization').length);
                
                if (token) {
                    // set token property
                    this.token = token;

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
        this.token = null;
        localStorage.removeItem('currentUser');
        /*
                this.http.post('http://localhost:8080/login', JSON.stringify({ username: '545505', password: 'Password01*' }))
                    .subscribe((response: Response) => {
                        //var payload = res.json(); 
                        console.log(response);
                        var headers = response.headers;
                        console.log(headers);
                        console.log(headers.get('Authorization'));
                        let authorization = headers.get('Authorization');
                        let bearer = authorization.substring(7, authorization.length);
                        console.log(bearer);
                    });
                    */
    }
}
