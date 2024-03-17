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
      console.log("question", question);this.question = question
    })
  }

  ngOnInit(): void {
    this.gameService.getQuestion()
  }

  checkAnswer(answer:String): void{
    if(this.question?.trueAnswer == answer){
      this.router.navigate(["/quiz/intermediate", true]).then(r => console.log("ok"))
    }
    else{
      this.router.navigate(["/quiz/intermediate", false]).then(r => console.log("ok"))
    }
    this.continueQuiz();
  }

  continueQuiz(){
      this.gameService.nextQuestion();
      console.log("question2",this.question)
      if(this.question == undefined){
        this.router.navigate(["/quiz/finish"]).then(r => console.log("ok"))
      }
    }
}
