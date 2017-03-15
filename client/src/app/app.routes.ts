import {Routes} from '@angular/router';
import {ProblemListComponent} from "./components/problem-list/problem-list.component";
import {ProblemComponent} from "./components/problem/problem.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {AuthGuardService} from "./services/auth-guard.service";

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
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    redirectTo: 'problems'
  }
];
