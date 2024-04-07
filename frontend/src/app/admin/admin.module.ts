import {NgModule} from "@angular/core";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {AdminNavbarComponent} from "./admin-navbar/admin-navbar.component";
import {AdminComponent} from "./admin.component";
import {LayoutModule} from "../layout/layout.module";
import {PatientModule} from "./pages/patient/patient.module";
import {RouterLink, RouterOutlet} from "@angular/router";

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
    RouterOutlet,
    RouterLink
  ]
})
export class AdminModule {
}
