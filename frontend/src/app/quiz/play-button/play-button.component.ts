import {Component, Input, OnInit} from '@angular/core';
import {isEmpty} from "rxjs";

@Component({
  selector: 'app-play-button',
  templateUrl: './play-button.component.html',
  styleUrls: ['./play-button.component.scss']
})
export class QuizPlayButtonComponent implements OnInit{

  @Input() song:string = "";
  constructor() {}

  protected readonly isEmpty = isEmpty;

  ngOnInit(): void {
  }
}
