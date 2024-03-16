import {Component, Input, OnInit} from "@angular/core";

@Component({
  selector: 'range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.scss']
})
export class RangeComponent implements OnInit{
  @Input() numeric: boolean = false;
  @Input() title: string= "";
  @Input() subject: string = "";
  @Input() tags: string[] = [];
  @Input() min: number = 0;
  @Input() max: number = 0;

  constructor() {
  }

  ngOnInit(): void {
    if(this.min==0 && this.max==0)
      this.max = this.tags.length-1;
  }
}
