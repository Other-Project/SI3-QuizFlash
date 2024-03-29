import {Component, ElementRef, Input, ViewChild} from "@angular/core";
import {User} from "../../../../../models/user.models";

@Component({
  selector: 'options',
  templateUrl: 'options.component.html',
  styleUrls: ['options.component.scss']
})

export class OptionsComponent{
  @ViewChild('automatedSkip') autoScrollCheckBox?: ElementRef;
  @ViewChild('showIncorrect') incorrectMessageCheckBox?: ElementRef;
  @ViewChild('answerHint') fiftyFiftyCheckBox?: ElementRef;
  @ViewChild('auditive') auditiveCheckBox?: ElementRef;
  @ViewChild('audioLaunch') audioLaunchCheckBox?: ElementRef;

  @Input() user?: User;

  changeDementiaLevel(newLevel: number): void {
    const lowOrIntermediate: boolean = newLevel == 0 || newLevel == 1;
    const low: boolean = newLevel == 0;

    if (this.fiftyFiftyCheckBox)
      this.fiftyFiftyCheckBox.nativeElement.checked = low;
    if (this.incorrectMessageCheckBox)
      this.incorrectMessageCheckBox.nativeElement.checked = low;
    if (this.autoScrollCheckBox)
      this.autoScrollCheckBox.nativeElement.checked = (newLevel == 2);
    if (this.auditiveCheckBox)
      this.auditiveCheckBox.nativeElement.checked = lowOrIntermediate;
    if (this.audioLaunchCheckBox) {
      this.audioLaunchCheckBox.nativeElement.checked = (newLevel == 1);
      this.audioLaunchCheckBox.nativeElement.disabled = !lowOrIntermediate;
    }
  }

  audioChange(audioEnabled: boolean) {
    if (!this.audioLaunchCheckBox) return;
    this.audioLaunchCheckBox.nativeElement.checked = audioEnabled;
    this.audioLaunchCheckBox.nativeElement.disabled = !audioEnabled;
  }
}
