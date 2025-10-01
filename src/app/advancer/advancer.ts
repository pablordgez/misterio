import { Component, ComponentRef, EventEmitter, Output, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { Inverter } from '../inverter/inverter';

@Component({
  selector: 'app-advancer',
  imports: [],
  templateUrl: './advancer.html',
  styleUrl: './advancer.css'
})
export class Advancer {
  Math = Math;
  value: number = 0;
  @ViewChild('inverterContainer', { read: ViewContainerRef, static: false }) inverterContainer!: ViewContainerRef;

  @Output() stateChange = new EventEmitter<number>();
  
  onSliderChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = Number(target.value);
    this.stateChange.emit(this.value);
  }

  onInverterChange() {
    this.value = this.value * -1;
    this.stateChange.emit(this.value);
  }

  addInverter(inverter: Type<Inverter>): Inverter {
    const compRef : ComponentRef<Inverter> = this.inverterContainer.createComponent(inverter);
    compRef.instance.stateChange.subscribe((state: boolean) => this.onInverterChange());
    return compRef.instance;
  }
}
