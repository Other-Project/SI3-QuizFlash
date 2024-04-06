import {Component, EventEmitter, OnInit, Output} from "@angular/core";

@Component({
  selector: "dont-playing-page",
  templateUrl: "./dont-playing-page.component.html",
  styleUrls: ["./dont-playing-page.component.scss"]
})
export class DontPlayingPageComponent implements OnInit {

  @Output() returnSelectionPage: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

  returnToQuizSelection() {
    this.returnSelectionPage.emit();
  }
}
