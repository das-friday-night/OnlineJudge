import {Routes} from '@angular/router';
import {ProblemListComponent} from "./components/problem-list/problem-list.component";
import {ProblemComponent} from "./components/problem/problem.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'problems',
    pathMatch: 'full'

  },
  {
    path: 'problems',
    component: ProblemListComponent
  },
  {
    path: 'problems/:id',
    component: ProblemComponent
  },
  {
    path: '**',
    redirectTo: 'problems'
  }
];
