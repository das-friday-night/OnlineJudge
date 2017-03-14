import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [AuthService]
})
export class NavbarComponent implements OnInit {
  title:string = "CODE";
  user: string = "";

  constructor(private auth: AuthService) { }

  ngOnInit() {
    if(this.auth.authenticated()){
      this.user = this.auth.getProfile().nickname;
    }
  }

  login(){
    this.auth.login()
      .then(profile => this.user = profile.nickname);
  }

}
