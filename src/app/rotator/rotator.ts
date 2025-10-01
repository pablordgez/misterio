import { Component, Input, Output, EventEmitter, ViewContainerRef, ViewChild, Type, ComponentRef } from '@angular/core';
import { RotatorFilter } from '../filters/rotatorFilter';
import { MachinePart } from '../machine/machinePart';
import { Advancer } from '../advancer/advancer';
import { Inverter } from '../inverter/inverter';

@Component({
  selector: 'app-rotator',
  imports: [],
  templateUrl: './rotator.html',
  styleUrl: './rotator.css'
})
export class Rotator implements MachinePart {
  Math = Math;
  filter : RotatorFilter = new RotatorFilter();
  rotation: number = 0;
  @ViewChild('inverterContainer', { read: ViewContainerRef, static: true }) inverterContainer!: ViewContainerRef;
  @ViewChild('advancerContainer', { read: ViewContainerRef, static: true }) advancerContainer!: ViewContainerRef;

  getFilter(): Filter {
    return this.filter;
  }

  @Output() stateChange = new EventEmitter<void>();

  onInverterChange(isInverted: boolean) {
    this.rotation = this.rotation * -1;
    this.filter.setRotation(this.rotation);
    this.stateChange.emit();
  }

  onAdvancerChange(advancer: number) {
    this.filter.setAdvancer(advancer);
    this.stateChange.emit();
  }

  onSliderChange(event: any) {
    this.rotation = event.target.value;
    this.filter.setRotation(this.rotation);
    this.stateChange.emit();
  }

  addAdvancer(advancer: Type<Advancer>): void {
    const compRef : ComponentRef<Advancer> = this.advancerContainer.createComponent(advancer);
    compRef.instance.stateChange.subscribe((state: number) => this.onAdvancerChange(state));
  }

  addInverter(inverter: Type<Inverter>): void {
    const compRef : ComponentRef<Inverter> = this.inverterContainer.createComponent(inverter);
    compRef.instance.stateChange.subscribe((state: boolean) => this.onInverterChange(state));
  }

}
