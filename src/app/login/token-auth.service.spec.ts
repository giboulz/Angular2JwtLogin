/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TokenAuthService } from './token-auth.service';

describe('TokenAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenAuthService]
    });
  });

  it('should containts a token', inject([TokenAuthService], (service: TokenAuthService) => {
    //Arrange
    service.token = 'toto'; 

    //Act

    //Assert
    expect(service.token).toBe('toto');
  }));
});
