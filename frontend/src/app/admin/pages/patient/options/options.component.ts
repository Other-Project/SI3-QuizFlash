import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Patient} from "../../../../../models/patient.models";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'options',
  templateUrl: 'options.component.html',
  styleUrls: ['options.component.scss']
})

export class OptionsComponent implements OnInit {
  @Output() userParametersChange: EventEmitter<Patient> = new EventEmitter<Patient>();

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
    this.patientParametersForm.patchValue({
      removeAnswers: this.patient?.removeAnswers,
      automatedSkip: this.patient?.automatedSkip,
      answerHint: this.patient?.answerHint,
      replayAtEnd: this.patient?.replayAtEnd,
      soundQuestion: this.patient?.soundQuestion,
      autoStartAudio: this.patient?.autoStartAudio
    });

    if (!this.patient?.autoStartAudio)
      this.patientParametersForm.get("autoStartAudio")!.disable();
  }

  changeDementiaLevel(newLevel: number): void {
    if (!this.patientParametersForm)
      return;

    const lowOrIntermediate: boolean = newLevel == 0 || newLevel == 1;
    const low: boolean = newLevel == 0;

    this.patientParametersForm.setValue({
      removeAnswers: newLevel == 2,
      automatedSkip: true,
      answerHint: low,
      replayAtEnd: low,
      soundQuestion: lowOrIntermediate,
      autoStartAudio: lowOrIntermediate
    });

    this.changedParameters();
  }

  changedParameters() {
    if (!this.patient || !this.patientParametersForm)
      return;

    let formValues = this.patientParametersForm.getRawValue();
    this.patient.removeAnswers = formValues.removeAnswers;
    this.patient.automatedSkip = formValues.automatedSkip;
    this.patient.answerHint = formValues.answerHint;
    this.patient.replayAtEnd = formValues.replayAtEnd;
    this.patient.soundQuestion = formValues.soundQuestion;
    this.patient.autoStartAudio = formValues.autoStartAudio;

    let autoStartCheckbox = this.patientParametersForm.get("autoStartAudio");

    (this.patient.soundQuestion) ? autoStartCheckbox?.enable() : autoStartCheckbox?.disable();

    this.userParametersChange.emit(this.patient);
  }
}
