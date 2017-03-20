import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable()
export class ProblemListFilterService {
  subject = new BehaviorSubject('');
  constructor() { }
  getFilterWord(): Observable<string> {
    return this.subject.asObservable();
  }
  setFilterWord(word: string) {
    this.subject.next(word);
  }
}
