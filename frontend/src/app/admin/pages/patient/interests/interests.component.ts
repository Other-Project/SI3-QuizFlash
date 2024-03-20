import {Component, Input, OnInit} from "@angular/core";


@Component({
  selector: 'interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.scss']
})

export class InterestsComponent implements OnInit{
  @Input() userHobbies?: string[];
  ngOnInit(): void {
  }
}
