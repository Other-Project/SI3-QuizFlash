import {Component, EventEmitter, OnInit, Output} from "@angular/core";

@Component({
  selector: "finish-page",
  templateUrl: './finish-page.component.html',
  styleUrls: ['./finish-page.component.scss']
})
export class FinishPageComponent implements OnInit{

  @Output() returnSelectionPage: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }
  ngOnInit(): void {
  }

  returnToQuizSelection() {
    this.returnSelectionPage.emit();
  }
}
