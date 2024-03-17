import {Component, Input, OnInit} from '@angular/core';
import {Location} from "@angular/common";

@Component({
  selector: 'intermediate-page',
  templateUrl: './finish-page.component.html',
  styleUrls: ['./finish-page.component.scss']
})
export class FinishPageComponent implements OnInit{

  constructor(private location: Location) {
  }
  ngOnInit(): void {
  }
}
