import { Component } from '@angular/core';
import { Rotator } from "../rotator/rotator";
import { FormsModule } from '@angular/forms';
import { Advancer } from "../advancer/advancer";
import { Inverter } from "../inverter/inverter";
import { Numberifier } from "../numberifier/numberifier";

@Component({
  selector: 'app-machine',
  imports: [Rotator, FormsModule, Advancer, Inverter, Numberifier],
  templateUrl: './machine.html',
  styleUrl: './machine.css'
})
export class Machine {
  components = [];
  isHidden = false;
  advancerValue: number = 0;
  text: string = '';
  isRotatorInverted: boolean = false;
  rotatedText: string = '';
  numberifiedText: string = '';

  onTextChange(value: string) {
    this.text = value;
  }
  
  onRotatedTextChange(value: string) {
    this.rotatedText = value;
  }

  onAdvancerValueChange(value: number) {
    this.advancerValue = value;
  }

  onRotatorInversionChange(isInverted: boolean) {
    this.isRotatorInverted = isInverted;
  }

  onAdvancerInversionChange(isInverted: boolean) {
    if(isInverted) {
      this.advancerValue = -Math.abs(this.advancerValue);
    } else {
      this.advancerValue = Math.abs(this.advancerValue);
    }
  }

  onNumberifierStateChange(value: string) {
    this.numberifiedText = value;
  }


}
