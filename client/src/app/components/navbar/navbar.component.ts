import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ProblemListFilterService} from "../../services/problem-list-filter.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title:string = "CODE";
  user: string = "";
  filterWord: FormControl = new FormControl();

  constructor(private auth: AuthService, private probFilterService: ProblemListFilterService) { }

  ngOnInit() {
    if(this.auth.authenticated()){
      this.user = this.auth.getProfile().nickname;
    }

    this.filterWord.valueChanges.debounceTime(600).subscribe(
      term => this.probFilterService.setFilterWord(term)
    );
  }

  login(){
    this.auth.login()
      .then(profile => this.user = profile.nickname);
  }

}
