import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-answer-button',
  templateUrl: './answer-button.component.html',
  styleUrls: ['./answer-button.component.scss']
})
export class AnswerButtonComponent implements OnInit {

  public text : string = "test";
  constructor() {}
  ngOnInit(): void { }
}
