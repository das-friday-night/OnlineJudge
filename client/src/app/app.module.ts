import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule} from '@angular/router';
import { routes } from "./app.routes";

import { AppComponent } from './app.component';
import { ProblemListComponent } from './components/problem-list/problem-list.component';
import { ProblemComponent } from './components/problem/problem.component';

import {DataService} from './services/data.service';
import {AuthService} from './services/auth.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddProblemComponent } from './components/add-problem/add-problem.component';
import { ProfileComponent } from './components/profile/profile.component';
import {AuthGuardService} from "./services/auth-guard.service";
import { EditorComponent } from './components/editor/editor.component';
import {CollaborationService} from "./services/collaboration.service";
import { ProblemListFilterPipe } from './pipes/problem-list-filter.pipe';
import {ProblemListFilterService} from "./services/problem-list-filter.service";


@NgModule({
  declarations: [
    AppComponent,
    ProblemListComponent,
    ProblemComponent,
    NavbarComponent,
    AddProblemComponent,
    ProfileComponent,
    EditorComponent,
    ProblemListFilterPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule
  ],
  providers: [
    DataService,
    AuthService,
    AuthGuardService,
    CollaborationService,
    ProblemListFilterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
