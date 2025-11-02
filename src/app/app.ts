import { ChangeDetectorRef, Component, signal, ViewChild, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Machine } from "./machine/machine";
import { Rotator } from './rotator/rotator';
import { Numberifier } from './numberifier/numberifier';
import { Advancer } from './advancer/advancer';
import { Inverter } from './inverter/inverter';
import { Repeater } from './repeater/repeater';
import { RepeaterShifter } from './repeater-shifter/repeater-shifter';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('misterio');
  machine : Machine = {} as Machine;
  solutionMachine : Machine = {} as Machine;
  @ViewChild('machineContainer', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;
  @ViewChild('solutionMachineContainer', { read: ViewContainerRef, static: true })
  solutionContainer!: ViewContainerRef;

  constructor(private cdr: ChangeDetectorRef) {}


  

  ngAfterViewInit() {
    const compRef = this.container.createComponent(Machine);
    this.machine = compRef.instance;
    let rotator : Rotator = this.machine.addPart(Rotator) as Rotator;
    
    this.cdr.detectChanges();
    
    let advancer : Advancer = rotator.addAdvancer(Advancer);
    rotator.addInverter(Inverter);
    
    this.cdr.detectChanges();
    
    advancer.addInverter(Inverter);
    this.machine.addPart(Numberifier);
    let repeater : Repeater = this.machine.addPart(Repeater) as Repeater;
    this.cdr.detectChanges();
    repeater.addShifter(RepeaterShifter);
    this.cdr.detectChanges();

    const solutionCompRef = this.solutionContainer.createComponent(Machine);
    this.solutionMachine = solutionCompRef.instance;
    let solutionRotator : Rotator = this.solutionMachine.addPart(Rotator) as Rotator;
    
    this.cdr.detectChanges();

    let solutionAdvancer : Advancer = solutionRotator.addAdvancer(Advancer);
    solutionRotator.addInverter(Inverter);

    this.cdr.detectChanges();

    solutionAdvancer.addInverter(Inverter);
    this.solutionMachine.addPart(Numberifier);
    let solutionRepeater : Repeater = this.solutionMachine.addPart(Repeater) as Repeater;
    this.cdr.detectChanges();
    solutionRepeater.addShifter(RepeaterShifter);
    this.cdr.detectChanges();

    this.solutionMachine.randomizePartsConfiguration();

    this.cdr.detectChanges();
    this.solutionMachine.toggleVisibility();
    this.cdr.detectChanges();
    this.solutionMachine.addRevealButton();
  }

}
