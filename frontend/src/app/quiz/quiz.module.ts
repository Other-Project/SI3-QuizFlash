import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {QuizPlayButtonComponent} from "./play-button/play-button.component";
import{QuizComponent} from "./quiz.component";
import {LayoutModule} from "../layout/layout.module";
import {QuizHeaderComponent} from "./quiz-header/quiz-header.component";
import {QuestionSectionComponent} from "./question-section/question-section.component";
import {AnswersComponent} from "./answers/answers.component";
import {RouterOutlet} from "@angular/router";
import {QuizSectionComponent} from "./quiz-section/quiz-section.component";
import {QuizRoutingModule} from "./quiz-routing.module";
import {IntermediatePageComponent} from "./intermediate-page/intermediate-page.component";
import {FinishPageComponent} from "./finish/finish-page.component";

@NgModule({
  declarations: [
    QuizComponent,
    QuizPlayButtonComponent,
    QuizHeaderComponent,
    QuestionSectionComponent,
    AnswersComponent,
    QuizSectionComponent,
    IntermediatePageComponent,
    FinishPageComponent
  ],
  imports: [
    CommonModule,
    NgOptimizedImage,
    LayoutModule,
    RouterOutlet,
    QuizRoutingModule
  ]
})
export class QuizModule {
}
