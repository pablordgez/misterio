import { Component, Output, Input, EventEmitter } from '@angular/core';
import { NumberifierFilter } from '../filters/numberifierFilter';
import { MachinePart } from '../machine/machinePart';

@Component({
  selector: 'app-numberifier',
  imports: [],
  templateUrl: './numberifier.html',
  styleUrl: './numberifier.css'
})
export class Numberifier implements MachinePart {
  stateText: string = 'Off';
  state: number = 1;
  alphabet: string = 'abcdefghijklmnopqrstuvwxyz';
  regularText: string = '';
  

  getFilter(): Filter {
    return this.filter;
  }
  
  states: Record<number, string> = {
    0: 'Disabled',
    1: 'Off',
    2: 'Enabled'
  }

  filter : NumberifierFilter = new NumberifierFilter(this.states);

  onSliderChange(event: any) {
    this.state = event.target.value;
    this.stateText = this.states[this.state];
    this.filter.setState(this.state);
    this.stateChange.emit();
  }

  @Output() stateChange: EventEmitter<void> = new EventEmitter<void>();



}
