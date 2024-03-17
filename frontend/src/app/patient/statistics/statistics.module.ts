import {NgModule} from '@angular/core';
import {StatisticsGraphComponent} from "../statistics-graph/statistics-graph.component";
import {AsyncPipe, NgIf, NgOptimizedImage} from "@angular/common";
import {StatisticsDataComponent} from "../statistics-data/statistics-data.component";

@NgModule({
  declarations: [
    StatisticsGraphComponent,
    StatisticsDataComponent
  ],
  exports: [
    StatisticsGraphComponent,
    StatisticsDataComponent
  ],
  imports: [
    NgOptimizedImage,
    AsyncPipe,
    NgIf,
  ]
})

export class StatisticsModule{
}
