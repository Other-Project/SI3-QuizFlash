import {AfterViewInit, Component, ElementRef, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {QuizService} from "../../../service/quiz-service.service";
import {QuestionType} from "../../../models/question-type.models";
import {UserService} from "../../../service/user.service";
import {Patient} from "../../../models/patient.models";

@Component({
  selector: 'sound-settings',
  templateUrl: './sound-settings.component.html',
  styleUrls: ['./sound-settings.component.scss']
})

export class SoundSettingsComponent implements AfterViewInit {
  @ViewChild("sound") audio?: ElementRef;
  private audioContext: AudioContext = new AudioContext();
  private soundNode?: MediaElementAudioSourceNode;
  private gainNode: GainNode = this.audioContext.createGain();
  private gainValue: number = 2;
  protected soundPlayed: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, quizService: QuizService, userService: UserService) {
    userService.user$.subscribe(user => {
      if (!(user as Patient)?.soundQuestion) {
        this.next();
        return;
      }
      quizService.quiz$.subscribe(quiz => {
        if (!quiz?.questions.some(question => question.type == QuestionType.Sound)) this.next();
      });
    });
  }

  ngAfterViewInit(): void {
    if (this.audio) {
      this.soundNode = this.audioContext.createMediaElementSource(this.audio.nativeElement);
      this.gainNode.gain.value = this.gainValue;
      this.soundNode.connect(this.gainNode).connect(this.audioContext.destination);
    }
  }

  play() {
    if (!this.audio || this.audio.nativeElement.readyState < 2) return;
    this.audio.nativeElement.play().then();
    this.soundPlayed = true;
  }

  pause() {
    if (!this.audio) return;
    this.audio.nativeElement.pause();
    this.soundPlayed = false;
  }

  gainChange(event: any) {
    this.gainValue = event.target.value;
    this.gainNode.gain.value = this.gainValue;
  }

  next() {
    this.router.navigate(["../question"], {relativeTo: this.route}).then();
  }
}
