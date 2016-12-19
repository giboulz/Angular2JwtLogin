import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { User } from './user';


@Injectable()
export class CurrentUserService {

  constructor(private http: Http) { }

  getCurrentUser(): Observable<User> {

    return this.http.get('http://localhost:8080/currentUserFromToken')
      .map((response: Response) => {
        return response.json()
      });
  }
}
