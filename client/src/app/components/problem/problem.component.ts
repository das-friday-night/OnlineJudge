import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {DataService} from "../../services/data.service";
import {Problem} from "../../problems/problem.model";


@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.css']
})
export class ProblemComponent implements OnInit {
  problem : Problem;

  constructor(private route: ActivatedRoute,
              private dataService: DataService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.dataService.getProblemByID(+params['id'])
        .then(problem => this.problem = problem);
    });
  }

}
