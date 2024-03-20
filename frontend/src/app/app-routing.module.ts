import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from "./admin/admin.component";
import {QuizComponent} from "./quiz/quiz.component";
import {IntermediatePageComponent} from "./quiz/intermediate-page/intermediate-page.component";
import {QuizSectionComponent} from "./quiz/quiz-section/quiz-section.component";
import {FinishPageComponent} from "./quiz/finish/finish-page.component";
import {AdminPatientsComponent} from "./admin/pages/patients/admin-patients.component";
import {PatientComponent} from "./admin/pages/patient/patient.component";
import {AdminQuizzComponent} from "./admin/pages/quizz/admin-quizz.component";
import {InformationComponent} from "./admin/pages/patient/information/information.component";
import {StatisticsComponent} from "./admin/pages/patient/statistics/statistics.component";
import {ProfilesComponent} from "./profiles/profiles.component";


const routes: Routes = [
  {path: '', pathMatch: "full", component:ProfilesComponent},
  {
    path: 'admin', component: AdminComponent, children: [
      {path: 'patients', component: AdminPatientsComponent},
      {
        path: 'patient/:user_id', component: PatientComponent, children: [
          {path: '', pathMatch: 'full', redirectTo: 'infos'},
          {path: 'infos', component: InformationComponent},
          {path: 'stats', component: StatisticsComponent}
        ]
      },
      {path: 'quizz', component: AdminQuizzComponent}
    ]
  },
  {
    path: 'quiz', component: QuizComponent, children: [
      {path: '', pathMatch: 'full', redirectTo: 'question'},
      {path: 'question', component: QuizSectionComponent},
      {path: 'intermediate/:check', component: IntermediatePageComponent},
      {path: 'finish', component: FinishPageComponent}]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
