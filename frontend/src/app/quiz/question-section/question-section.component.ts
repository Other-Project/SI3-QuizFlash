import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'question-section',
  templateUrl: './question-section.component.html',
  styleUrls: ['./question-section.component.scss']
})
export class QuestionSectionComponent implements OnInit{
  @Input() question:string = "";
  @Input() image:string = "";
  @Input() sound:string = "";

  constructor() {}

  protected readonly length = length;

  ngOnInit(): void {
  }
}
