import {Component, OnInit} from '@angular/core';
import {GameService} from "../../../service/game-service.service";

@Component({
  selector: 'quiz-header',
  templateUrl: './quiz-header.component.html',
  styleUrls: ['./quiz-header.component.scss']
})
export class QuizHeaderComponent implements OnInit{

  public theme:String = "test";
  public pageNumber:number = 1;
  constructor(public gameService:GameService) {
    this.gameService.theme$.subscribe((themeQuiz:string)=>{ // Subscribe to the theme in gameService to have in real time the theme of the quiz
      this.theme = themeQuiz
    })
    this.gameService.compt$.subscribe((number:number)=>{ // Subscribe to the compt in gameService to have in real time the number of the question done
      this.pageNumber = number;
    })
  }

  ngOnInit():void {}
}
