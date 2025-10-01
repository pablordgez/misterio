import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-numberifier',
  imports: [],
  templateUrl: './numberifier.html',
  styleUrl: './numberifier.css'
})
export class Numberifier {
  state: string = 'Off';
  value: number = 1;
  alphabet: string = 'abcdefghijklmnopqrstuvwxyz';
  regularText: string = '';
  
  states: Record<number, string> = {
    0: 'Disabled',
    1: 'Off',
    2: 'Enabled'
  }

  onSliderChange(event: any) {
    this.value = Number(event.target.value);
    this.state = this.states[this.value];
    this.stateChange.emit(
      this.value === 0 ? this.unNumberifyText(this.regularText) :
      this.value === 1 ? this.regularText : this.numberifyText(this.regularText)
    );
  }

  @Output() stateChange = new EventEmitter<string>();

  numberifyText(text: string) : string{
    let outputText: string = '';
    for(let i = 0; i < text.length; i++){
      const char = text[i];
      if(!isNaN(parseInt(char))){
        outputText += char;
      }
      else{
        const index = this.alphabet.indexOf(char.toLowerCase());
        if(index !== -1){
          outputText += (index + 1).toString();
        }
      }
    }
    return outputText;
  }

  unNumberifyText(text: string) : string{
    let outputText: string = '';
    for(let i = 0; i < text.length; i++){
      const char = text[i];
      if(!isNaN(parseInt(char))){
        const index = parseInt(char);
        if(index >= 0 && index < this.alphabet.length){
          outputText += this.alphabet.charAt(index);
        }
      } else {
        outputText += char;
      }
    }
    return outputText;
  }

  @Input() set text(value: string) {
    this.regularText = value;
    this.stateChange.emit(
      this.value === 0 ? this.unNumberifyText(value) :
      this.value === 1 ? value : this.numberifyText(value)
    );
  }

}
