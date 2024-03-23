import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {
  @Input()
  public src?: string;
  @Input()
  public alt?: string;
  @Input()
  public width?: number;
  @Input()
  public height?: number;

  constructor() {
  }
}
