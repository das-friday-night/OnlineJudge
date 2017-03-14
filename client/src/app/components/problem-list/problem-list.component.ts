import { Component, OnInit } from '@angular/core';
import {Problem} from '../../problems/problem.model';
import {DataService} from "../../services/data.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.css']
})
export class ProblemListComponent implements OnInit {
  problems: Problem[];
  subscriptionProblems: Subscription;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.subscriptionProblems = this.dataService.getAllProblems()
      .subscribe(problems => this.problems = problems);
  }
}
