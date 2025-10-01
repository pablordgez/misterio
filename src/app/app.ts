import { Component, signal, ViewChild, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Machine } from "./machine/machine";
import { Rotator } from './rotator/rotator';
import { Numberifier } from './numberifier/numberifier';
import { Advancer } from './advancer/advancer';
import { Inverter } from './inverter/inverter';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('misterio');
  machine : Machine = {} as Machine;
  @ViewChild('machineContainer', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  ngAfterViewInit() {
    const compRef = this.container.createComponent(Machine);
    this.machine = compRef.instance;
    let rotator : Rotator = this.machine.addPart(Rotator) as Rotator;
    rotator.addInverter(Inverter);
    rotator.addAdvancer(Advancer);
    this.machine.addPart(Numberifier);
  }

}
