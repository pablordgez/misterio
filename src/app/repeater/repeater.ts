import { Component, EventEmitter, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { MachinePart } from '../machine/machinePart';
import { RepeaterFilter } from '../filters/repeater';
import { RepeaterShifter } from '../repeater-shifter/repeater-shifter';

@Component({
  selector: 'app-repeater',
  imports: [],
  templateUrl: './repeater.html',
  styleUrl: './repeater.css'
})
export class Repeater implements MachinePart {
  filter : RepeaterFilter = new RepeaterFilter();
  @ViewChild('shifterContainer', { read: ViewContainerRef, static: false }) shifterContainer!: ViewContainerRef;

  getFilter(): Filter {
    return this.filter;
  }
  stateChange: EventEmitter<void> = new EventEmitter<void>();

  onSelectorChange(event: any) {
    this.filter.setSelector(event.target.value);
    this.stateChange.emit();
  }

  onPositionChange(position: number) {
    this.filter.setPosition(position);
    this.stateChange.emit();
  }

  addShifter(shifter: Type<RepeaterShifter>): RepeaterShifter {
    const componentRef = this.shifterContainer.createComponent(shifter);
    componentRef.instance.stateChange.subscribe((position: number) => this.onPositionChange(position));
    return componentRef.instance;
  }
}