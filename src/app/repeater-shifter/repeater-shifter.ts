import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-repeater-shifter',
  imports: [],
  templateUrl: './repeater-shifter.html',
  styleUrl: './repeater-shifter.css'
})
export class RepeaterShifter {
  position: number = 1;

  onPositionChange(event: any) {
    this.position = event.target.value;
    this.stateChange.emit(this.position);
  }

  @Output() stateChange: EventEmitter<number> = new EventEmitter<number>();

}
