import {NgModule} from '@angular/core';
import {StatisticsGraphComponent} from "../statistics-graph/statistics-graph.component";
import {AsyncPipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
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
    NgForOf,
  ]
})

export class StatisticsModule{
}
