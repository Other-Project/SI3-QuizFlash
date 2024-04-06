import {NgModule} from "@angular/core";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {QuizPlayButtonComponent} from "./play-button/play-button.component";
import {QuizComponent} from "./quiz.component";
import {LayoutModule} from "../layout/layout.module";
import {QuizHeaderComponent} from "./quiz-header/quiz-header.component";
import {QuestionSectionComponent} from "./question-section/question-section.component";
import {AnswersComponent} from "./answers/answers.component";
import {RouterLink, RouterOutlet} from "@angular/router";
import {QuizSectionComponent} from "./quiz-section/quiz-section.component";
import {FinishPageComponent} from "./finish/finish-page.component";
import {QuestionResultComponent} from "./question-result/question-result.component";
import {QuizSelectionComponent} from "./quiz-selection/quiz-selection.component";
import {QuizSelectionCardComponent} from "./quiz-selection/quiz-selection-card/quiz-selection-card.component";
import {SoundSettingsComponent} from "./sound-settings/sound-settings.component";
import {SettingsModule} from "../admin/pages/patient/settings/settings.module";
import {DontPlayingPageComponent} from "./dont-playing/dont-playing-page.component";


@NgModule({
  declarations: [
    QuizComponent,
    QuizPlayButtonComponent,
    QuizHeaderComponent,
    QuestionSectionComponent,
    DontPlayingPageComponent,
    AnswersComponent,
    QuizSectionComponent,
    QuestionResultComponent,
    FinishPageComponent,
    QuizSelectionComponent,
    QuizSelectionCardComponent,
    SoundSettingsComponent
  ],
  imports: [
    CommonModule,
    NgOptimizedImage,
    LayoutModule,
    RouterOutlet,
    RouterLink,
    SettingsModule,
  ]
})
export class QuizModule {
}
