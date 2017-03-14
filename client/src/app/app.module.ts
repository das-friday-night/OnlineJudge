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
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddProblemComponent } from './components/add-problem/add-problem.component';


@NgModule({
  declarations: [
    AppComponent,
    ProblemListComponent,
    ProblemComponent,
    NavbarComponent,
    AddProblemComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
