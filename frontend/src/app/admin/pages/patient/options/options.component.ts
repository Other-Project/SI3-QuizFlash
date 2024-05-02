import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Patient} from "../../../../../models/patient.models";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'options',
  templateUrl: 'options.component.html',
  styleUrls: ['options.component.scss']
})

export class OptionsComponent implements OnInit {
  @Output() onUserOptionsChange: EventEmitter<Patient> = new EventEmitter<Patient>();

  @Input() patient?: Patient;

  protected patientParametersForm: FormGroup = new FormGroup({
    removeAnswers: new FormControl(),
    automatedSkip: new FormControl(),
    answerHint: new FormControl(),
    replayAtEnd: new FormControl(),
    soundQuestion: new FormControl(),
    autoStartAudio: new FormControl()
  });

  ngOnInit() {
    this.patientParametersForm.get("soundQuestion")?.valueChanges.subscribe(this.soundQuestionChanged.bind(this));
    this.patientParametersForm.valueChanges.subscribe(() =>
      this.onUserOptionsChange.emit(this.patientParametersForm.getRawValue()));
    this.patientParametersForm.patchValue(this.patient as {});
  }

  soundQuestionChanged(soundQuestionEnabled: boolean) {
    const autoStartCheckbox = this.patientParametersForm.get("autoStartAudio");
    soundQuestionEnabled ? autoStartCheckbox?.enable({emitEvent: false}) : autoStartCheckbox?.disable({emitEvent: false});
    if (!soundQuestionEnabled) autoStartCheckbox?.setValue(false);
  }

  changeDementiaLevel(newLevel: number): void {
    this.patientParametersForm.patchValue({
      removeAnswers: newLevel >= 2,
      automatedSkip: true,
      answerHint: newLevel <= 0,
      replayAtEnd: newLevel <= 0,
      soundQuestion: newLevel <= 1,
      autoStartAudio: newLevel <= 1
    });
  }
}
