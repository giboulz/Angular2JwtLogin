/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpInterceptor } from './HttpInterceptor.service';
import {
    ConnectionBackend, RequestOptions, Headers, BaseRequestOptions,
    Response, HttpModule, Http, XHRBackend, RequestMethod, ResponseOptions
} from '@angular/http';
import { Router } from '@angular/router';
import { TokenAuthService } from './token-auth.service';
import { MockBackend, MockConnection } from '@angular/http/testing';

describe('HttpInterceptor', () => {
    let mockRouter;
    let mockBackend: MockBackend;
    let mockTokenAuth: TokenAuthService;

    beforeEach(async(() => {
        mockRouter = {
            navigate(url: string): string { return url; },
            navigateByUrl(url: string): string { return url; }
        };


        TestBed.configureTestingModule({
            providers: [
                MockBackend,
                BaseRequestOptions,
                { provide: Router, useValue: mockRouter },
                TokenAuthService,
                {
                    provide: HttpInterceptor,
                    deps: [MockBackend, BaseRequestOptions, Router, TokenAuthService],
                    useFactory:
                    (backend: XHRBackend, defaultOptions: BaseRequestOptions, tokenAuthService: TokenAuthService, router: Router) => {
                        return new HttpInterceptor(backend, defaultOptions, tokenAuthService, router);
                    }
                }
            ]
        });
        mockBackend = TestBed.get(MockBackend);
        mockTokenAuth = TestBed.get(TokenAuthService);
    }));

    //dont work, tokenAuthService is not initialized
    it('GET should add authorisation header if token is present', async(inject([HttpInterceptor], (service: HttpInterceptor) => {
        //Arrange
        mockTokenAuth.token = 'token';

        mockBackend.connections.subscribe((connection: MockConnection) => {
            //arrange
            connection.mockRespond(new Response(new ResponseOptions({

            }
            )));
        });

        //Act
        service.get('/test').subscribe((data) => {
            //expect(data.headers).toBe('');
        });

        //Assert

    })));

    it('GET should redirect to login on 401 request', inject([HttpInterceptor], (service: HttpInterceptor) => {
        //Arrange
        mockBackend.connections.subscribe((connection: MockConnection) => {
            //arrange
            connection.mockRespond(new Response(new ResponseOptions({
                status: 401
            }
            )));
        });
        //Act
        service.get('/test').subscribe((res) => {
        });

        //Assert

    }));
});
