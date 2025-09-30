import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-advancer',
  imports: [],
  templateUrl: './advancer.html',
  styleUrl: './advancer.css'
})
export class Advancer {
  value: number = 0;

  @Output() valueChange = new EventEmitter<number>();
  
  onSliderChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = Number(target.value);
    this.valueChange.emit(this.value);
  }

}
