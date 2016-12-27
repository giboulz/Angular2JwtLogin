/* tslint:disable:no-unused-variable */


import {
  TestBed,
  getTestBed,
  async,
  inject
} from '@angular/core/testing';
import {
  Headers, BaseRequestOptions,
  Response, HttpModule, Http, XHRBackend, RequestMethod
} from '@angular/http';
import { ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { AuthenticationService } from './authentication.service';
import { TokenAuthService } from './token-auth.service'
import { Observable } from 'rxjs';

describe('AuthenticationService', () => {
  let mockBackend: MockBackend;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthenticationService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory:
          (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }
        },
        //we use the real service, there is actually nothing in it
        TokenAuthService],
      imports: [
        HttpModule
      ]
    });
    mockBackend = TestBed.get(MockBackend);
  }));

  it('should be truthy', inject([AuthenticationService], (service: AuthenticationService) => {
    expect(service).toBeTruthy();
  }));


  it('login should refuse incoming request without any header', async(inject([AuthenticationService], (authService) => {
    //Arrange
    mockBackend.connections.subscribe((connection: MockConnection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: [{
          id: 25,
          age: 2
        }]
      }
      )));
    });

    //Act
    authService.login('toto', 'password').subscribe((res) => {

      //Assert
      expect(res).toBe(false);
    });
  })));

  it('login should accept request with Authorization Header', async(inject([AuthenticationService], (authService) => {
    mockBackend.connections.subscribe((connection: MockConnection) => {
      //arrange
      let authHeader = new Headers({ 'Authorization': 'Bearer coucou' });
      connection.mockRespond(new Response(new ResponseOptions({
        headers: authHeader
      }
      )));
    });

    //Act
    authService.login('toto', 'password').subscribe((res) => {
      //Assert
      expect(res).toBe(true);
    });
  })));

  it('login should store token in localstorage on a request with authorization header', async(inject([AuthenticationService], (authService) => {
    //Arrange
    spyOn(localStorage, 'setItem');

    mockBackend.connections.subscribe((connection: MockConnection) => {
      let authHeader = new Headers({ 'Authorization': 'Bearer coucou' });
      connection.mockRespond(new Response(new ResponseOptions({
        headers: authHeader
      }
      )));
    });
    //Act
    authService.login('toto', 'password').subscribe((res) => {
      //assert
      expect(localStorage.setItem).toHaveBeenCalled();
    });
  })));

  it('logout should remove localstorage', inject([AuthenticationService], (service: AuthenticationService) => {
    //arrange
    spyOn(localStorage, 'removeItem');

    //Act
    service.logout();

    //Assert
    expect(localStorage.removeItem).toHaveBeenCalled();
  }));


});
