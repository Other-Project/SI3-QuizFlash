import {NgModule} from '@angular/core';
import {PatientComponent} from "./patient.component";
import {BoxedContainerComponent} from "./boxed-container/boxed-container.component";
import {NgOptimizedImage} from "@angular/common";
import {StatisticsComponent} from "./statistics/statistics.component";
import {InformationComponent} from "./information/information.component";
import {StatisticsModule} from "./statistics/statistics.module";
import {InformationModule} from "./information/information.module";
import {PatientNavbarComponent} from "./navbar/patient-navbar.component";
import {RouterLink, RouterOutlet} from "@angular/router";
import {LayoutModule} from "../../../layout/layout.module";
import {PatientHeaderModule} from "./header/patient-header.module";


@NgModule({
  declarations: [
    PatientComponent,
    BoxedContainerComponent,
    StatisticsComponent,
    InformationComponent,
    PatientNavbarComponent
  ],
    imports: [
      PatientHeaderModule,
        NgOptimizedImage,
        StatisticsModule,
        InformationModule,
        RouterOutlet,
        RouterLink,
        LayoutModule
    ]
})

export class PatientModule {
}
