import {AfterViewInit, Component, ElementRef, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {QuizService} from "../../../service/quiz-service.service";
import {QuestionType} from "../../../models/question-type.models";
import {UserService} from "../../../service/user.service";

@Component({
  selector: 'sound-settings',
  templateUrl: './sound-settings.component.html',
  styleUrls: ['./sound-settings.component.scss']
})

export class SoundSettingsComponent {
  public gainValue: number = 2;

  constructor(private router: Router, private route: ActivatedRoute, quizService: QuizService, userService: UserService) {
    userService.user$.subscribe(user => {
      if (!user?.soundQuestion) {
        this.next();
        return;
      }
      quizService.quiz$.subscribe(quiz => {
        if (!quiz?.questions.some(question => question.type == QuestionType.Sound)) this.next();
      });
    });
  }

  gainChange(event: any) {
    this.gainValue = event.target.value;
  }

  next() {
    this.router.navigate(["../question"], {relativeTo: this.route}).then();
  }
}
