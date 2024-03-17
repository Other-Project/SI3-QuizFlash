import {Component, ElementRef, ViewChild} from "@angular/core";

@Component({
  selector: 'options',
  templateUrl: 'options.component.html',
  styleUrls: ['options.component.scss']
})

export class OptionsComponent{
  @ViewChild('autoscroll') autoScrollCheckBox: ElementRef | undefined;
  @ViewChild('incorrect') incorrectMessageCheckBox: ElementRef | undefined;
  @ViewChild('fifty') fiftyFiftyCheckBox: ElementRef | undefined;
  @ViewChild('auditive') auditiveCheckBox: ElementRef | undefined;
  @ViewChild('audiolaunch') audioLaunchCheckBox: ElementRef | undefined;

  changeOptions(settings: {[key: string]: any}) : void{
      let dementia: string = settings["dementia"]
      let deafness: string = settings["deafness"]
      if(this.auditiveCheckBox)
        this.auditiveCheckBox.nativeElement.checked = (dementia == "0" || dementia == "1") && deafness != "2";
      if(this.fiftyFiftyCheckBox)
        this.fiftyFiftyCheckBox.nativeElement.checked = (dementia == "0");
      if(this.incorrectMessageCheckBox)
        this.incorrectMessageCheckBox.nativeElement.checked = (dementia == "0");
      if(this.autoScrollCheckBox)
        this.autoScrollCheckBox.nativeElement.checked = (dementia=="2");
      if(this.audioLaunchCheckBox)
        this.audioLaunchCheckBox.nativeElement.checked = (dementia=="0" || dementia=="1") && (deafness!="2");
  }
}
