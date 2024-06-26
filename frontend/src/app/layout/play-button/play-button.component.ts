import {Component, ElementRef, Input, ViewChild} from "@angular/core";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {LayoutModule} from "../layout.module";

@Component({
  selector: 'app-play-button',
  templateUrl: './play-button.component.html',
  imports: [
    NgIf,
    NgOptimizedImage,
    LayoutModule
  ],
  standalone: true
})
export class PlayButtonComponent {
  @Input() autoPlay: boolean = false;
  @Input() public src?: string;
  @Input() set volume(gainValue: number) {
    if (!gainValue || gainValue <= 0) return;
    this.gainValue = gainValue;
    if (this.gainNode)
      this.gainNode.gain.value = this.gainValue;
  }
  @ViewChild("sound") audio?: ElementRef;
  private audioContext?: AudioContext;
  private soundNode?: MediaElementAudioSourceNode;
  private gainNode?: GainNode;
  private gainValue: number = 2;
  protected soundPlayed: boolean = false;

  init(): void {
    if (this.audioContext || !this.audio) return;
    this.audioContext = new AudioContext();
    this.gainNode = this.audioContext.createGain();
    this.soundNode = this.audioContext.createMediaElementSource(this.audio.nativeElement);
    this.gainNode.gain.value = this.gainValue;
    this.soundNode.connect(this.gainNode).connect(this.audioContext.destination);
  }

  playPause() {
    if (!this.audioContext) this.init();
    if (!this.audio || this.audio.nativeElement.readyState < 2) return;
    if (!this.soundPlayed) this.audio.nativeElement.play().then();
    else this.audio.nativeElement.pause()?.then();
    this.soundPlayed = !this.soundPlayed;
  }

  onAudioLoaded() {
    if (this.autoPlay && !this.soundPlayed)
      this.playPause();
  }
}
