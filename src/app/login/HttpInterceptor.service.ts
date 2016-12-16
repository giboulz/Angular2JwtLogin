import { Injectable } from '@angular/core';
import { Http, Headers, Response, ConnectionBackend, RequestOptions, Request, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { TokenAuthService } from '../token-auth.service'; 

@Injectable()
export class HttpInterceptor extends Http {
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private tokenAuthService: TokenAuthService) {
        super(backend, defaultOptions);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {


        if(this.tokenAuthService.token){
              /*if(!options){
                  options = ; 
              }
              let headers = options.headers ;

            options.headers.append('Authorization', this.tokenAuthService.token);
        */
            console.log("got a token ! "); 
        }
        return this.intercept(super.request(url, options));
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        //console.log('Before the request....');
        return this.intercept(super.get(url, options));
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.post(url, body, this.getRequestOptionArgs(options)));
    }

    put(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.put(url, options));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.delete(url, options));

    }

    getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {

        if (options != null && options.headers == null) {
            options.headers.append('Content-Type', 'application/json');
        }

        return options;
    }


    intercept(observable: Observable<Response>): Observable<Response> {
        return observable.catch((err, source) => {
            if (err.status == 401 || err.status == 403/*&& !_.endsWith(err.url, 'api/auth/login')*/) {
                //this._router.navigate(['/login']);
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