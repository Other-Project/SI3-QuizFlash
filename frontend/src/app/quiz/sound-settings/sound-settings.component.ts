import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from "@angular/core";


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

  constructor() {
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

  @Output() soundSettingsFinish: EventEmitter<any> = new EventEmitter<any>();
  next() {
    this.soundSettingsFinish.emit();
  }
}
