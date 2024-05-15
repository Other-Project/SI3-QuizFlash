import {inject, NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AdminComponent} from "./admin/admin.component";
import {QuizGameComponent} from "./quiz/quiz-game/quiz-game.component";
import {AdminPatientsComponent} from "./admin/pages/patients/admin-patients.component";
import {PatientComponent} from "./admin/pages/patient/patient.component";
import {AdminQuizzesComponent} from "./admin/pages/quizzes/admin-quizzes.component";
import {ProfilesComponent} from "./profiles/profiles.component";
import {AccessChecker} from "../service/access-checker.service";
import {AccessRestriction} from "../models/access-restriction.models";
import {AdminQuizComponent} from "./admin/pages/quizzes/quiz/admin-quiz.component";
import {QuizGameSelectionComponent} from "./quiz/quiz-game-selection/quiz-game-selection.component";

export const checkAccess = (restriction: AccessRestriction) => inject(AccessChecker).canActivate(restriction);

const routes: Routes = [
  {path: "", pathMatch: "full", component: ProfilesComponent},
  {
    path: "admin", component: AdminComponent, canActivate: [() => checkAccess(AccessRestriction.Admin)], children: [
      {path: "", pathMatch: "full", redirectTo: "patients"},
      {path: "patients", component: AdminPatientsComponent},
      {path: "patient", component: PatientComponent},
      {path: "patient/:user_id", component: PatientComponent},
      {
        path: "quizzes", children: [
          {path: "", pathMatch: "full", component: AdminQuizzesComponent},
          {path: "quiz", component: AdminQuizComponent},
          {path: "quiz/:quiz_id", component: AdminQuizComponent}
        ]
      }
    ]
  },
  {
    path: "quizzes", canActivate: [() => checkAccess(AccessRestriction.User)], children: [
      {path: "", pathMatch: "full", component: QuizGameSelectionComponent},
      {path: "quiz/:quiz_id", component: QuizGameComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
