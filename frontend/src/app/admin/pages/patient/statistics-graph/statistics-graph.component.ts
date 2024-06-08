import {Component, EventEmitter, Input, Output} from "@angular/core";
import Chart from "chart.js/auto";
import {DataTypes, StatsFilter} from "../../../../../models/stats-enumerates";
import {DatePipe} from "@angular/common";

@Component({
  selector: "stats-graph",
  templateUrl: "statistics-graph.component.html",
  styleUrls: ["statistics-graph.component.scss"]
})

export class StatisticsGraphComponent {
  protected readonly StatsFilter = StatsFilter;
  protected readonly DataType = DataTypes;

  @Input() title: string = "";
  @Input() patientId!: string;

  @Input()
  set graphData(graphData: [string[], number[]]) {
    if (!this.chart)
      this.createChart(graphData);
    else this.updateChart(graphData);
  }

  @Output() optionsSelection: EventEmitter<{ dataType: DataTypes, statFilter: StatsFilter }> = new EventEmitter();

  protected dataAvailable: boolean = false;
  protected selectedQuizId?: string;
  public chart?: any;
  protected filter: StatsFilter = StatsFilter.TRY;
  protected dataType: DataTypes = DataTypes.SUCCESS;

  private yLabels = {
    try: "Date de réalisation du quiz",
    question: "Intitulé de la question"
  }

  private dataLabels = {
    success: "Taux de réussite",
    time: "Temps moyen de réponse"
  };

  constructor(private datePipe: DatePipe) {
  }

  createChart(graphData: [string[], number[]]) {
    const style = window.getComputedStyle(document.body);
    const primaryColor = style.getPropertyValue("--primaryColor");
    this.dataAvailable = graphData[0].length != 0;
    this.chart = new Chart("stat-chart", {
      type: "line",
      data: {
        labels: this.processLabels(graphData[0]),
        datasets: [{
          borderWidth: 1,
          fill: true,
          label: this.dataLabels[this.dataType],
          backgroundColor: this.addAlpha(primaryColor, 0.5),
          borderColor: primaryColor,
          data: graphData[1].map(value => Math.round(value * 10) / 10)
        }]
      },
      options: {
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              label: (data: any) => this.toolTipLabel(data)
            }
          }
        },
        responsive: true,
        aspectRatio: 2.5,
        scales: {
          y: {
            title: {
              display: true,
              text: this.dataLabels[this.dataType]
            },
            suggestedMin: 0,
            suggestedMax: 100
          },
          x: {
            title: {
              display: true,
              text: this.yLabels[this.filter]
            }
          }
        }
      }
    });
  }

  selectedGraphType(filter: StatsFilter, dataType: DataTypes) {
    this.optionsSelection.emit({dataType: dataType, statFilter: filter});
  }

  updateChart(graphData: [string[], number[]]) {
    this.dataAvailable = graphData[0].length != 0;
    if (graphData[0].length == 0 || !this.chart) return;
    let graphType = "line";

    if (this.filter === StatsFilter.QUESTION) {
      this.chart.data.datasets[0].barThickness = 30;
      graphType = "bar";
    }

    this.chart.config.type = graphType;

    this.chart.options = {
      maintainAspectRatio: false,
      responsive: true,
      aspectRatio: 2.5,
      plugins: {
        tooltip: {
          callbacks: {
            label: (data: any) => this.toolTipLabel(data)
          }
        }
      },
      scales: {
        y: {
          title: {
            display: true,
            text: this.dataLabels[this.dataType]
          },
          suggestedMin: 0,
          suggestedMax: (this.dataType == DataTypes.SUCCESS) ? 100
            : Math.max.apply(null, graphData[1]) * 1.5
        },
        x: {
          title: {
            display: true,
            text: this.yLabels[this.filter]
          }
        }
      }
    };

    this.chart.data.labels = this.processLabels(graphData[0]);
    this.chart.data.datasets[0].data = graphData[1].map(value => Math.round(value * 10) / 10);
    this.chart.data.datasets[0].label = this.dataLabels[this.dataType];
    this.chart.update();
  }

  quizSelection(quizId?: string) {
    if (!this.patientId) return;
    if (!quizId) {
      this.dataType = DataTypes.SUCCESS;
      this.filter = StatsFilter.TRY;
    }
    this.selectedQuizId = quizId;
  }

  private addAlpha(color: string, opacity: number) {
    const _opacity = Math.round(Math.min(Math.max(opacity ?? 1, 0), 1) * 255);
    return color + _opacity.toString(16).toUpperCase();
  }

  private toolTipLabel(data: any): string {
    const title: string = data.dataset.label;
    const value: number = data.dataset.data[data.dataIndex];
    let formattedValue: string;

    if (this.dataType === DataTypes.TIME)
      formattedValue = this.datePipe.transform(value * 60000, "mm 'minutes' ss 'secondes'", "UTC")!;
    else formattedValue = value + " %";
    return title + " : " + formattedValue;
  }

  private processLabels(graphLabels: string[]): string[] {
    if (this.filter == StatsFilter.TRY)
      graphLabels = graphLabels.map(date => this.datePipe.transform(new Date(date), "dd/MM/yyyy',' HH'h'mm") ?? "");
    return graphLabels;
  }
}
