import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rotator',
  imports: [],
  templateUrl: './rotator.html',
  styleUrl: './rotator.css'
})
export class Rotator {
  rotatedText: string = '';
  regularText: string = '';
  value: number = 0;
  advancerValue: number = 0;
  Math = Math;

  alphabet : string = "abcdefghijklmnopqrstuvwxyz0123456789";

  @Input() set text(value: string) {
    this.regularText = value;
    this.rotatedText = this.rotateText();
    this.textChange.emit(this.rotatedText);
  }

  @Input() set advancer(value: number) {
    this.advancerValue = value;
    this.rotatedText = this.rotateText();
    this.textChange.emit(this.rotatedText);
  }

  @Input() set inverted(isInverted: boolean) {
    this.value = isInverted ? -Math.abs(this.value) : Math.abs(this.value);
    this.rotatedText = this.rotateText();
    this.textChange.emit(this.rotatedText);
  }

  @Output() textChange = new EventEmitter<string>();

  rotateText() : string {
    let rotatedText: string = '';
    let shift: number = 0;
    for (let i = 0; i < this.regularText.length; i++) {
      const char = this.regularText[i];
      const index = this.alphabet.indexOf(char.toLowerCase());
      if(index !== -1) {
        let newIndex = (index + this.value + shift) % this.alphabet.length;
        if(newIndex < 0) {
          newIndex += this.alphabet.length;
        }
        rotatedText += this.alphabet.charAt(newIndex);
      }
      shift += this.advancerValue;
    }
    return rotatedText;
  }

  onSliderChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = Number(target.value);
    this.rotatedText = this.rotateText();
    this.textChange.emit(this.rotatedText);
  }

}
