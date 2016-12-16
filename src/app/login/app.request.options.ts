import { Injectable, Inject, OpaqueToken } from '@angular/core';
import { BaseRequestOptions, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { AuthenticationService } from '../authentication.service';

export const WEBAPI_URL_TOKEN = new OpaqueToken('webApiBaseUrl');


export class AppRequestOptions extends BaseRequestOptions {
    constructor(@Inject(WEBAPI_URL_TOKEN) private webApiBaseUrl: string,
        ) {
        super();
        console.log('webApiBaseUrl = ' + webApiBaseUrl);
    }

    merge(options?: RequestOptionsArgs): RequestOptions {
        //does not work
        //options.url = this.webApiBaseUrl + options.url;

        //let token = this.authenticationService.token; 


        return super.merge(options);
    }
}