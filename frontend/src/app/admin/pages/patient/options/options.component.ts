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

  protected patientParametersForm!: FormGroup;

  ngOnInit() {
    this.initializeForm();
    this.subscribeToSoundQuestionChanges();
    this.patientParametersForm.patchValue(this.patient as {});
  }

  subscribeToSoundQuestionChanges(): void {
    this.patientParametersForm.get("soundQuestion")?.valueChanges.subscribe(soundQuestionEnabled => {
      const autoStartCheckbox = this.patientParametersForm.get("autoStartAudio");
      soundQuestionEnabled ? autoStartCheckbox?.enable() : autoStartCheckbox?.disable();
      if (!soundQuestionEnabled) autoStartCheckbox?.setValue(false);
    });
  }

  initializeForm(): void {
    const formGroupConfig: any = {};
    const patientKeys = Object.keys(this.patient || {});

    patientKeys.forEach(key => {
      formGroupConfig[key] = new FormControl("");
    });

    this.patientParametersForm = new FormGroup(formGroupConfig);
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

    this.changedParameters();
  }

  changedParameters() {
    if (!this.patient)
      return;

    let formValues: Patient = this.patientParametersForm.getRawValue();
    this.onUserOptionsChange.emit(formValues);
  }
}
