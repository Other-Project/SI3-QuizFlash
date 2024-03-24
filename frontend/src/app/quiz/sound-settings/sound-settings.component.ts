import {Component, OnInit} from '@angular/core';
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
  private playButton: HTMLElement | null = null;
  private pauseButton: HTMLElement | null = null;

  constructor(private router: Router, private route: ActivatedRoute, quizService: QuizService, userService: UserService) {
    if (!userService.user$.value.soundQuestion) this.router.navigate(["../question"], {relativeTo: this.route}).then();
    let soundQuestion: boolean = false;
    for (let i = 0; i < quizService.quiz$!.value!.questions.length; i++) {
      if (quizService.quiz$!.value!.questions.at(i)!.type == QuestionType.Sound) soundQuestion = true;
    }
    if (!soundQuestion) this.router.navigate(["../question"], {relativeTo: this.route}).then();
  }

  ngOnInit(): void {
    this.playButton = document.getElementById("play-button");
    this.pauseButton = document.getElementById("pause-button");
    this.pauseButton!.style.display = "none";
    this.playButton!.style.display = "block";
    this.audio = document.getElementsByTagName("audio").item(0);
    if (this.audio) {
      this.soundNode = this.audioContext.createMediaElementSource(this.audio);
      this.gainNode.gain.value = this.gainValue;
      this.soundNode.connect(this.gainNode).connect(this.audioContext.destination);
    }
  }

  play() {

    if (this.audio) {
      if (this.audio.readyState >= 2) {
        this.audio.play().then();
      }
    }
    this.pauseButton!.style.display = "block";
    this.playButton!.style.display = "none";
  }

  pause() {
    if (this.audio) {
      this.audio.pause()
    }
    this.pauseButton!.style.display = "none";
    this.playButton!.style.display = "block";
  }

  gainChange(event: any) {
    this.gainValue = event.target.value;
    this.gainNode.gain.value = this.gainValue
    if (this.soundNode) {
      this.soundNode.connect(this.gainNode).connect(this.audioContext.destination)
    }
  }

  next() {
    this.router.navigate(["../question"], {relativeTo: this.route}).then()
  }
}
