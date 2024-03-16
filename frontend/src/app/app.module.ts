import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {PatientHeaderComponent} from "./patient/header/patient-header.component";
import {NgOptimizedImage} from "@angular/common";
import {BoxedContainerComponent} from "./patient/boxed-container/boxed-container.component";
import {RangeComponent} from "./patient/range/range.component";
import {PatientPageComponent} from "./patient/page/patient-page.component";

@NgModule({
  declarations: [
    AppComponent,
    PatientHeaderComponent,
    BoxedContainerComponent,
    RangeComponent,
    PatientPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
