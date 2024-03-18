import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {GameService} from "../../../service/game-service.service";
import {Question} from "../../../models/question.models";


@Component({
  selector: 'app-quiz-section',
  templateUrl: './quiz-section.component.html',
  styleUrls: ['./quiz-section.component.scss']
})
export class QuizSectionComponent  implements OnInit{
  protected question:Question | undefined;
  constructor(private router:Router, public gameService:GameService) {
    this.gameService.question$.subscribe((question:Question)=>{
      this.question = question
    })
  }

  ngOnInit(): void {
    this.gameService.getQuestion()
  }

  checkAnswer(answer:String): void{
    if(this.question?.trueAnswer == answer) //Open the intermediate page with good text depends on answer (if it is good or not)
      this.router.navigate(["/quiz/intermediate", true]).then(
        r => {
          if(r)this.continueQuiz();
          else console.log("Quiz intermediate launch error")
        })
    else
      this.router.navigate(["/quiz/intermediate", false]).then(
        r => {
          if(r)this.continueQuiz();
          else console.log("Quiz intermediate launch error")
        })
  }

  continueQuiz(){
      this.gameService.nextQuestion();
      if(this.question == undefined) //Open the finish page at the end of the quiz
        this.router.navigate(["/quiz/finish"]).then(
          r => {
            if(!r)console.log("Quiz finish launch error")
          })
    }
}
