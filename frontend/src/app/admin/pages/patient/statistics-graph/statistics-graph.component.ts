import {Component, Input} from "@angular/core";

@Component({
  selector: 'stats-graph',
  templateUrl: 'statistics-graph.component.html',
  styleUrls: ['statistics-graph.component.scss']
})

export class StatisticsGraphComponent{
  @Input() title: string = "";
  @Input() src: string = "";
}
