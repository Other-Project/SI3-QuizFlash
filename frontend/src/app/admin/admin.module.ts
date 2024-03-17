import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {AdminRoutingModule} from "./admin-routing.module";
import {AdminNavbarComponent} from "./admin-navbar/admin-navbar.component";
import {AdminComponent} from "./admin.component";
import {LayoutModule} from "../layout/layout.module";
import {PatientModule} from "./pages/patient/patient.module";

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
    AdminRoutingModule,
    LayoutModule,
    NgOptimizedImage,
    PatientModule
  ]
})
export class AdminModule {
}
