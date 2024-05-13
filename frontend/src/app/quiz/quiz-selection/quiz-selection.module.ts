import {NgModule} from "@angular/core";
import {QuizSelectionComponent} from "./quiz-selection.component";
import {QuizSelectionCardComponent} from "./quiz-selection-card/quiz-selection-card.component";
import {LayoutModule} from "../../layout/layout.module";
import {NgForOf} from "@angular/common";

@NgModule({
    declarations: [
      QuizSelectionCardComponent,
      QuizSelectionComponent
    ],
    exports: [
      QuizSelectionComponent
    ],
    imports: [
      LayoutModule,
      NgForOf
    ]
  }
)
export class QuizSelectionModule {
}
