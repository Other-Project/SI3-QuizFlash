import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'quiz-header',
  templateUrl: './quiz-header.component.html',
  styleUrls: ['./quiz-header.component.scss']
})
export class QuizHeaderComponent implements OnInit{

  public theme:String = "test";
  public pageNumber:number = 1;
  constructor() {}

  ngOnInit():void {}
}
