import { Injectable } from '@angular/core';
import { Http, Headers, Response, ConnectionBackend, RequestOptions, Request, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from '../login/authentication.service';
import { TokenAuthService } from '../login/token-auth.service';

@Injectable()
export class HttpInterceptor extends Http {

    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private tokenAuthService: TokenAuthService, private router: Router) {
        super(backend, defaultOptions);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.request(url, options));
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        // console.log('Before the request....');
        return this.intercept(super.get(url, this.setAuthorisation(options)));
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.post(url, body, this.setAuthorisation(options)));
    }

    put(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.put(url, this.setAuthorisation(options)));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.delete(url, this.setAuthorisation(options)));
    }


    setAuthorisation(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (this.tokenAuthService.token) {
            options = this.InstanciateHeaderInOptionIfNeeded(options);

            options.headers.append('Authorization', this.tokenAuthService.token);
        }

        return options;
    }

    InstanciateHeaderInOptionIfNeeded(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (options === undefined) {
            options = new RequestOptions();
        }

        if (options.headers === undefined || options.headers == null) {
            options.headers = new Headers();
        }
        return options;
    }


    intercept(observable: Observable<Response>): Observable<Response> {
        return observable.catch((err, source) => {
            console.log("Intercept");
            console.log(err.status)
            if (err.status == 401 || err.status == 403/*&& !_.endsWith(err.url, 'api/auth/login')*/) {
                this.router.navigate(['/login']);
                console.log("Erreur Authentication");
                return Observable.empty();
            } else {
                return Observable.throw(err);
            }
        }).finally(() => {
            //console.log('After the request...');
        });

    }
}