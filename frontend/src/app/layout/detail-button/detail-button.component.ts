import {Component, EventEmitter, OnInit, Output} from "@angular/core";


@Component({
  selector: "detail-button",
  templateUrl: "detail-button.component.html",
  styleUrls: ["detail-button.component.scss"]
})

export class DetailButtonComponent implements OnInit {
  protected detailValue: boolean = false;
  @Output() detail: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit() {
  }


  setDetail() {
    this.detailValue = !this.detailValue;
    this.detail.emit(this.detailValue);
  }

}
