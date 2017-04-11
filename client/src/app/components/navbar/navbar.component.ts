import { Component, OnInit, OnDestroy } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ProblemListFilterService} from "../../services/problem-list-filter.service";
import {FormControl} from "@angular/forms";
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title:string = "CODE";
  user: string = "";
  filterWord: FormControl = new FormControl();
  subscription: Subscription;

  constructor(private auth: AuthService, private probFilterService: ProblemListFilterService) { }

  ngOnInit() {
    if(this.auth.authenticated()){
      this.user = this.auth.getProfile().nickname;
    }

    this.subscription = this.filterWord.valueChanges.debounceTime(600).subscribe(
      term => this.probFilterService.setFilterWord(term)
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  login(){
    this.auth.login()
      .then(profile => this.user = profile.nickname);
  }

}
