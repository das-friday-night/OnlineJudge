import { Injectable } from '@angular/core';
import {Problem} from '../problems/problem.model';
import { Http, Response, Headers } from '@angular/http';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable()
export class DataService {
  probs: Problem[] = [];
  private problemsSource = new BehaviorSubject<Problem[]>([]);

  constructor(private http: Http) { }

  getAllProblems(): Observable<Problem[]> {
    this.http.get("api/v1/problems")
      .toPromise()
      .then((res: Response) => {
        this.problemsSource.next(res.json());
      })
      .catch(this.handleError);
    return this.problemsSource.asObservable();
  }

  getProblemByID(id: number): Promise<Problem> {
    return this.http.get(`api/v1/problems/${id}`)
      .toPromise()
      .then((res: Response) => res.json())
      .catch(this.handleError);
  }

  addProblem(newProblem:Problem): Promise<Problem> {
    let headers = new Headers({ 'content-type': 'application/json' });
    return this.http.post('/api/v1/problems', newProblem, headers)
      .toPromise()
      .then((res: Response) => {
        this.getAllProblems();
        return res.json();
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.body || error);
  }

}
