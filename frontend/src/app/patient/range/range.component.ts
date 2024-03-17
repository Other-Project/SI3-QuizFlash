import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";

@Component({
  selector: 'range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.scss']
})
export class RangeComponent implements OnInit{
  @Output() changeEvent: EventEmitter<any> = new EventEmitter

  @Input() numeric: boolean = false;
  @Input() title: string= "";
  @Input() subject: string = "";
  @Input() tags: string[] = [];
  @Input() min: number = 0;
  @Input() max: number = 0;
  @Input() defaultValue: number = 1;

  constructor() {
  }

  ngOnInit(): void {
    if(this.min==0 && this.max==0)
      this.max = this.tags.length-1;
  }

  choiceChange(event: any): void{
    const id = event.target.id;
    const value = event.target.value;
    this.changeEvent.emit({ id, value });
  }
}
