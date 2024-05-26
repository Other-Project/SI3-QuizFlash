import {NgModule} from "@angular/core";
import {CommonModule, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {QuizGameComponent} from "./quiz-game.component";
import {LayoutModule} from "../../layout/layout.module";
import {QuizHeaderComponent} from "./quiz-header/quiz-header.component";
import {QuestionSectionComponent} from "./question-section/question-section.component";
import {AnswersComponent} from "./answers/answers.component";
import {RouterLink, RouterOutlet} from "@angular/router";
import {QuizSectionComponent} from "./quiz-section/quiz-section.component";
import {FinishPageComponent} from "./finish/finish-page.component";
import {QuestionResultComponent} from "./question-result/question-result.component";
import {SoundSettingsComponent} from "./sound-settings/sound-settings.component";
import {SettingsModule} from "../../admin/pages/patient/settings/settings.module";
import {PlayButtonComponent} from "../../layout/play-button/play-button.component";


@NgModule({
  declarations: [
    QuizGameComponent,
    QuizHeaderComponent,
    QuestionSectionComponent,
    AnswersComponent,
    QuizSectionComponent,
    QuestionResultComponent,
    FinishPageComponent,
    SoundSettingsComponent
  ],
  exports: [
  ],
  imports: [
    NgOptimizedImage,
    CommonModule,
    LayoutModule,
    RouterOutlet,
    RouterLink,
    SettingsModule,
    PlayButtonComponent,
    NgIf,
    NgForOf
  ]
})
export class QuizGameModule {
}
