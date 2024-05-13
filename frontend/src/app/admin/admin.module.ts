import {NgModule} from "@angular/core";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {AdminNavbarComponent} from "./admin-navbar/admin-navbar.component";
import {AdminComponent} from "./admin.component";
import {LayoutModule} from "../layout/layout.module";
import {PatientModule} from "./pages/patient/patient.module";
import {RouterLink, RouterOutlet} from "@angular/router";
import {QuizSelectionModule} from "../quiz/quiz-selection/quiz-selection.module";

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
    QuizSelectionModule,
    RouterOutlet,
    RouterLink
  ]
})
export class AdminModule {
}
