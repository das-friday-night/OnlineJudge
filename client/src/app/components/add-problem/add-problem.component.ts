import { Component, OnInit } from '@angular/core';
import {Problem} from "../../problems/problem.model";
import {DataService} from "../../services/data.service";


const BLANKPROB: Problem = Object.freeze({
  id: 0,
  name: '',
  desc: '',
  difficulty: ''
});

@Component({
  selector: 'app-add-problem',
  templateUrl: './add-problem.component.html',
  styleUrls: ['./add-problem.component.css']
})

export class AddProblemComponent implements OnInit {
  difficulties: string[] = ['easy', 'medium', 'hard'];
  newproblem: Problem = Object.assign({}, BLANKPROB);

  constructor(private DataService: DataService) { }

  ngOnInit() {
  }

  add():void{
    this.DataService.addProblem(this.newproblem)
      .catch(err => console.log(err._body));
    this.newproblem = Object.assign({}, BLANKPROB);
  }
}
