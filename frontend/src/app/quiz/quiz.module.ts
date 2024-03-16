import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {AnswerButtonComponent} from "./answer-button/answer-button.component";
import {QuizPlayButtonComponent} from "./play-button/play-button.component";
import{QuizComponent} from "./quiz.component";
import {LayoutModule} from "../layout/layout.module";
import {QuizHeaderComponent} from "./quiz-header/quiz-header.component";
import {QuestionSectionComponent} from "./question-section/question-section.component";
import {AnswersComponent} from "./answers/answers.component";


@NgModule({
  declarations: [
    QuizComponent,
    QuizPlayButtonComponent,
    AnswerButtonComponent,
    QuizHeaderComponent,
    QuestionSectionComponent,
    AnswersComponent
  ],
  imports: [
    CommonModule,
    NgOptimizedImage,
    LayoutModule,
  ]
})
export class QuizModule {
}
