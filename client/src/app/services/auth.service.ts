// app/auth.service.ts

import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

// Avoid name not found warnings
let Auth0Lock: any = require('auth0-lock').default;

@Injectable()
export class AuthService {
  // Configure Auth0
  auth0ClientID = 'nUNxFRJrlgV384L9NqSRcaOREcAlaEl5';
  auth0clientDomain = 'learnonlinejudge.auth0.com';
  options = {
    // https://auth0.com/docs/libraries/lock/v10/customization#auth-object-
    auth: {
      // params: {scope: 'openid nickname'},  // https://auth0.com/docs/libraries/lock/v10/sending-authentication-parameters
      // redirectUrl: 'http://localhost:3000', // this will set redirect url to localhost3000
      redirect: false, // this will turn off any redirection
      responseType: 'token',
      // turn of single sign on. turn on sso will generate two data in localstorage
      sso: false
    },
    // close widget after successful login
    autoclose: true,
    // disable avatar function
    avatar: null
  }

  lock = new Auth0Lock(this.auth0ClientID, this.auth0clientDomain, this.options);

  constructor() {
    // Add callback for lock `authenticated` event

  }

  public login(): Promise<any> {
    // Call the show method to display the widget.
    this.lock.show();
    return new Promise((resolve, reject) => {
      this.lock.on("authenticated", (authResult) => {
        this.lock.getUserInfo(authResult.accessToken, function(error, profile){
          if(error){
            reject(error);
          }
          localStorage.setItem("profile", JSON.stringify(profile));
          resolve(profile);
        })
        // id_token is needed for authenticated()
        localStorage.setItem('id_token', authResult.idToken);
      }); // end lock.on
    }); // end promise

  }

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem("id_token");
    localStorage.removeItem('profile');
  }

  public authenticated():boolean {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  }

  public getProfile(): any{
    if(localStorage.getItem("profile") != null){
      return JSON.parse(localStorage.getItem("profile"));
    } else {
      console.log("no profile saved in localstorage");
      return null;
    }
  }

}
