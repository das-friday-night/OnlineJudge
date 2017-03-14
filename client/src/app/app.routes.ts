import {Routes} from '@angular/router';
import {ProblemListComponent} from "./components/problem-list/problem-list.component";
import {ProblemComponent} from "./components/problem/problem.component";
import {ProfileComponent} from "./components/profile/profile.component";

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
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: '**',
    redirectTo: 'problems'
  }
];
