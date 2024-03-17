import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'patient-header',
  templateUrl: './patient-header.component.html',
  styleUrls: ['./patient-header.component.scss']
})
export class PatientHeaderComponent implements OnInit{
  public name: string = "Lubrat";
  public firstName: string = "Jean-Luc";
  public age: number = 52;
  public imageUrl: string = "../../assets/profile.png"

  constructor() {}

  ngOnInit(): void {
  }
}
