import {NgModule} from "@angular/core";
import {PatientComponent} from "./patient.component";
import {DatePipe, KeyValuePipe, NgForOf, NgIf, NgOptimizedImage, NgStyle, NgSwitch, NgSwitchCase} from "@angular/common";
import {StatisticsComponent} from "./statistics/statistics.component";
import {InformationComponent} from "./information/information.component";
import {StatisticsModule} from "./statistics/statistics.module";
import {InformationModule} from "./information/information.module";
import {PatientNavbarComponent} from "./navbar/patient-navbar.component";
import {RouterLink, RouterOutlet} from "@angular/router";
import {LayoutModule} from "../../../layout/layout.module";
import {PatientHeaderModule} from "./header/patient-header.module";
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import {HistoricComponent} from "./historic/historic.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {PlayButtonComponent} from "../../../layout/play-button/play-button.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AttemptSummaryComponent} from "./attempt-summary/attempt-summary.component";
import {AttemptSummaryStatsPartComponent} from "./attempt-summary-stats-part/attempt-summary-stats-part.component";
import {AttemptSummaryDetailsPartComponent} from "./attempt-summary-details-part/attempt-summary-details-part.component";
import {AttemptSummaryQuestionTypeComponent} from "./attempt-summary-question-type/attempt-summary-question-type.component";


@NgModule({
  declarations: [
    PatientComponent,
    StatisticsComponent,
    InformationComponent,
    PatientNavbarComponent,
    HistoricComponent,
    AttemptSummaryComponent,
    AttemptSummaryStatsPartComponent,
    AttemptSummaryDetailsPartComponent,
    AttemptSummaryQuestionTypeComponent
  ],
  imports: [
    PatientHeaderModule,
    NgOptimizedImage,
    StatisticsModule,
    InformationModule,
    RouterOutlet,
    RouterLink,
    LayoutModule,
    NgMultiSelectDropDownModule,
    NgSwitch,
    NgSwitchCase,
    NgIf,
    FaIconComponent,
    KeyValuePipe,
    NgForOf,
    PlayButtonComponent,
    ReactiveFormsModule,
    FormsModule,
    NgStyle
  ],
  providers: [
    DatePipe,
  ]
})

export class PatientModule {
}
