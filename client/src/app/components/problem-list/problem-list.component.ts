import { Component, OnInit, OnDestroy } from '@angular/core';
import {Problem} from '../../problems/problem.model';
import {DataService} from "../../services/data.service";
import {Subscription} from "rxjs";
import {ProblemListFilterService} from "../../services/problem-list-filter.service";

@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.css']
})
export class ProblemListComponent implements OnInit {
  problems: Problem[];
  filterWord: string = '';
  subscriptionProblems: Subscription;

  constructor(private dataService: DataService, private probFilterService: ProblemListFilterService) { }

  ngOnInit() {
    this.subscriptionProblems = this.dataService.getAllProblems()
      .subscribe(problems => this.problems = problems);

    this.probFilterService.getFilterWord().subscribe(word => this.filterWord = word);
  }

  ngOnDestory() {
    this.subscriptionProblems.unsubscribe();
  }
}
