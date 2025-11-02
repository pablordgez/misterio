import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inverter',
  imports: [FormsModule],
  templateUrl: './inverter.html',
  styleUrl: './inverter.css'
})
export class Inverter {
  checked: boolean = false;

  @Output() stateChange = new EventEmitter<boolean>();

  toggleInversion() {
    this.stateChange.emit(this.checked);
  }

  randomizeConfiguration(): void {
    this.checked = Math.random() < 0.5;
    this.stateChange.emit(this.checked);
  }

}
