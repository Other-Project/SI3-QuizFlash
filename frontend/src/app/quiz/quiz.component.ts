import {Component, OnInit} from '@angular/core';

import {Router} from "@angular/router";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent  implements OnInit{

  constructor(private router: Router){
  }

  ngOnInit(): void {
    this.router.navigate(["/quiz/question"])
  }
}
