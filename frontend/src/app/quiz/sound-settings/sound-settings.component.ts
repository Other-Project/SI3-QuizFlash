import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {QuizService} from "../../../service/quiz-service.service";
import {QuestionType} from "../../../models/question-type.models";
import {UserService} from "../../../service/user.service";

@Component({
  selector: 'sound-settings',
  templateUrl: './sound-settings.component.html',
  styleUrls: ['./sound-settings.component.scss']
})

export class SoundSettingsComponent implements OnInit {
  private audio: HTMLMediaElement | null = null;
  private audioContext: AudioContext = new AudioContext();
  private soundNode?: MediaElementAudioSourceNode;
  private gainNode: GainNode = this.audioContext.createGain();
  private gainValue: number = 2;
  protected soundPlayed: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, quizService: QuizService, userService: UserService) {
    userService.user$.subscribe(user => {
      if (!user?.soundQuestion) {
        this.next();
        return;
      }
      quizService.quiz$.subscribe(quiz => {
        if (!quiz?.questions.some(question => question.type == QuestionType.Sound)) this.next();
      });
    });
  }

  ngOnInit(): void {
    this.audio = document.getElementsByTagName("audio").item(0);
    if (this.audio) {
      this.soundNode = this.audioContext.createMediaElementSource(this.audio);
      this.gainNode.gain.value = this.gainValue;
      this.soundNode.connect(this.gainNode).connect(this.audioContext.destination);
    }
  }

  play() {
    if (!this.audio || this.audio.readyState < 2) return;
    this.audio.play().then();
    this.soundPlayed = true;
  }

  pause() {
    if (!this.audio) return;
    this.audio.pause();
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
