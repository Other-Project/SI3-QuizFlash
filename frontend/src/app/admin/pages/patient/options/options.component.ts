import {Component, ElementRef, Input, ViewChild} from "@angular/core";
import {Patient} from "../../../../../models/patient.models";

@Component({
  selector: 'options',
  templateUrl: 'options.component.html',
  styleUrls: ['options.component.scss']
})

export class OptionsComponent{
  @ViewChild("removeFalseAnswer") removeFalseAnswerCheckBox?: ElementRef;
  @ViewChild("replayQuestion") replayCheckBox?: ElementRef;
  @ViewChild("automatedSkip") automatedSkip?: ElementRef;
  @ViewChild('answerHint') fiftyFiftyCheckBox?: ElementRef;
  @ViewChild('auditive') auditiveCheckBox?: ElementRef;
  @ViewChild('audioLaunch') audioLaunchCheckBox?: ElementRef;

  @Input() user?: Patient;

  changeDementiaLevel(newLevel: number): void {
    const lowOrIntermediate: boolean = newLevel == 0 || newLevel == 1;
    const low: boolean = newLevel == 0;

    if (this.fiftyFiftyCheckBox)
      this.fiftyFiftyCheckBox.nativeElement.checked = low;
    if (this.automatedSkip)
      this.automatedSkip.nativeElement.checked = true;
    if (this.replayCheckBox)
      this.replayCheckBox.nativeElement.checked = low;
    if (this.removeFalseAnswerCheckBox)
      this.removeFalseAnswerCheckBox.nativeElement.checked = (newLevel == 2);
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
