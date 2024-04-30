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
    removeAnswers: new FormControl(""),
    automatedSkip: new FormControl(""),
    answerHint: new FormControl(""),
    replayAtEnd: new FormControl(""),
    soundQuestion: new FormControl(""),
    autoStartAudio: new FormControl("")
  });

  ngOnInit() {
    this.patientParametersForm.patchValue(this.patient as {});

    this.patientParametersForm.get("soundQuestion")?.valueChanges.subscribe(soundQuestionEnabled => {
      let autoStartCheckbox = this.patientParametersForm.get("autoStartAudio");
      soundQuestionEnabled ? autoStartCheckbox?.enable() : autoStartCheckbox?.disable();
      if (!soundQuestionEnabled) autoStartCheckbox?.setValue(false);
    });

    if (!this.patient?.autoStartAudio)
      this.patientParametersForm.get("autoStartAudio")!.disable();
  }

  changeDementiaLevel(newLevel: number): void {
    this.patientParametersForm.setValue({
      removeAnswers: newLevel >= 2,
      automatedSkip: true,
      answerHint: newLevel <= 0,
      replayAtEnd: newLevel <= 0,
      soundQuestion: newLevel <= 1,
      autoStartAudio: newLevel <= 1
    });

    this.changedParameters();
  }

  changedParameters() {
    if (!this.patient)
      return;

    let formValues = this.patientParametersForm.getRawValue();
    this.patient = Object.assign({}, this.patient, formValues);
    this.onUserOptionsChange.emit(this.patient);
  }
}
