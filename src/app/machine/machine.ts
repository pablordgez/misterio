import { Component, ComponentRef, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MachineFilterChain } from './machineFilterChain';
import { MachinePart } from './machinePart';

@Component({
  selector: 'app-machine',
  imports: [FormsModule],
  templateUrl: './machine.html',
  styleUrl: './machine.css'
})
export class Machine {
  isHidden = false;
  text: string = '';
  ciphertext: string = '';
  machineFilterChain: MachineFilterChain = new MachineFilterChain();
  @ViewChild('partsContainer', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  onPartChange(){
    this.processText();
  }

  onTextChange(text: string): void {
    this.text = text;
    this.processText();
  }

  addPart<T extends MachinePart>(part: Type<T>): MachinePart {
    const compRef : ComponentRef<T> = this.container.createComponent(part);
    compRef.instance.stateChange.subscribe(() => this.onPartChange());
    this.machineFilterChain.addFilter(compRef.instance.getFilter());
    return compRef.instance;
  }

  processText(): void {
    this.ciphertext = this.machineFilterChain.applyFilters(this.text);
  }
}
