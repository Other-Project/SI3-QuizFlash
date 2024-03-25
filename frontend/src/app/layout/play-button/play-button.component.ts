import {AfterViewInit, Component, ElementRef, Input, ViewChild} from "@angular/core";
import {NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-play-button',
  templateUrl: './play-button.component.html',
  styleUrls: ['./play-button.component.scss'],
  imports: [
    NgIf,
    NgOptimizedImage
  ],
  standalone: true
})
export class PlayButtonComponent implements AfterViewInit{
  @Input() public src?: string;
  @Input() set volume(gainValue: number) {
    this.gainValue = gainValue;
    this.gainNode.gain.value = this.gainValue;
    console.log(gainValue);
  }

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
}
