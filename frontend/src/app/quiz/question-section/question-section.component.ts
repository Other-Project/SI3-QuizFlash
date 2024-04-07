import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'question-section',
  templateUrl: './question-section.component.html',
  styleUrls: ['./question-section.component.scss']
})
export class QuestionSectionComponent implements OnInit {
  @Input() question: string = ""; //To have the text of the question in parameter
  @Input() image: string = ""; //To have the image url of the question in parameter
  @Input() sound: string = ""; //To have the sound url of the question in parameter
  @Input() fontSize!: string;
  @Input() volume!:number;

  constructor() {
  }

  ngOnInit(): void {
  }
}
