/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LoginComponent } from './login.component';
import { Router } from '@angular/router';

import { AuthenticationService } from './authentication.service';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authenticationService;
  let mockRouter;
  let elValider;

  beforeEach(async(() => {
    authenticationService = {
      login(user: string, password: string): Observable<boolean> {
        return Observable.of(true);
      },
      logout(): void {
      }
    };
    mockRouter = {
      navigate(url: string): string { return url; }, 
      navigateByUrl(url: string): string { return url; }
    };




    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: AuthenticationService, useValue: authenticationService },
        { provide: Router, useValue: mockRouter }
      ],
      imports: [FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    elValider = fixture.debugElement.query(By.css('#valider'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should redirect to /user if login is successfull ', inject([Router], (router: Router) => {
    //arrange
    const spy = spyOn(router, 'navigateByUrl');

    //Act
    component.model.username = "toto";
    component.model.password = "password";
    fixture.detectChanges();

    //elValider.triggerEventHandler('login', null);
    component.login();


    //Assert
    // args passed to router.navigate()
    const navArgs = spy.calls.first().args[0];
    console.log(navArgs);

    // expecting to navigate to /user
    expect(navArgs).toBe('/user',
      'should nav to /user');
  }));

});
