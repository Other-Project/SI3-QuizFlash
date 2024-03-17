import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgOptimizedImage} from "@angular/common";
import {AdminModule} from "./admin/admin.module";
import {QuizModule} from "./quiz/quiz.module";
import {PatientModule} from "./patient/patient.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    AdminModule,
    PatientModule,
    AdminModule,
    QuizModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
