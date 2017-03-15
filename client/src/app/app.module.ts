import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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


@NgModule({
  declarations: [
    AppComponent,
    ProblemListComponent,
    ProblemComponent,
    NavbarComponent,
    AddProblemComponent,
    ProfileComponent,
    EditorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    DataService,
    AuthService,
    AuthGuardService,
    CollaborationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
