import { Injectable } from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthGuardService implements CanActivate{

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(): boolean{
    if(this.auth.authenticated()){
      return true
    } else {
      this.router.navigate(['/problems']);
      return false;
    }
  }

  isAdmin(): boolean{
    let profile = this.auth.getProfile();
    if(profile == null){
      return false;
    } else if(profile.roles.includes('Admin')){
      return true;
    } else {
      return false;
    }
  }

}
