import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
//import {AdminRoutingModule} from "./admin-routing.module";
import {AdminNavbarComponent} from "./admin-navbar/admin-navbar.component";
import {AdminComponent} from "./admin.component";
import {LayoutModule} from "../layout/layout.module";
import {PatientModule} from "./pages/patient/patient.module";
import {RouterOutlet} from "@angular/router";

@NgModule({
  declarations: [
    AdminNavbarComponent,
    AdminComponent
  ],
  exports: [
    AdminNavbarComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    NgOptimizedImage,
    PatientModule,
    RouterOutlet
  ]
})
export class AdminModule {
}
