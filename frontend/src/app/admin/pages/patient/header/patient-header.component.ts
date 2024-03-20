import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../../../models/user.models";

@Component({
  selector: 'patient-header',
  templateUrl: './patient-header.component.html',
  styleUrls: ['./patient-header.component.scss']
})
export class PatientHeaderComponent implements OnInit{
  @Input() user?: User;

  constructor() {}

  ngOnInit(): void {
  }
}
