import { Component, EventEmitter, Type, ViewChild, ViewContainerRef, ComponentRef } from '@angular/core';
import { MachinePart } from '../machine/machinePart';
import { RepeaterFilter } from '../filters/repeater';
import { RepeaterShifter } from '../repeater-shifter/repeater-shifter';
import { max } from 'rxjs';

@Component({
  selector: 'app-repeater',
  imports: [],
  templateUrl: './repeater.html',
  styleUrl: './repeater.css'
})
export class Repeater implements MachinePart {
  
  @ViewChild('shifterContainer', { read: ViewContainerRef, static: false }) shifterContainer!: ViewContainerRef;
  maxValue: number = 3;
  filter : RepeaterFilter = new RepeaterFilter(this.maxValue);
  position: number = 0;

  getFilter(): Filter {
    return this.filter;
  }
  stateChange: EventEmitter<void> = new EventEmitter<void>();

  onSelectorChange(event: any) {
    this.position = event.target.value;
    this.filter.setSelector(this.position);
    this.stateChange.emit();
  }

  onPositionChange(position: number) {
    this.filter.setPosition(position);
    this.stateChange.emit();
  }

  addShifter(shifter: Type<RepeaterShifter>): RepeaterShifter {
    const componentRef = this.shifterContainer.createComponent(shifter);
    componentRef.instance.stateChange.subscribe((position: number) => this.onPositionChange(position));
    this.filter.setHasShifter(true);
    this.filter.setMaxShifter(componentRef.instance.maxPosition);
    return componentRef.instance;
  }

}