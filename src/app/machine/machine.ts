import { Component, ComponentRef, ElementRef, Inject, PLATFORM_ID, Renderer2, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MachineFilterChain } from './machineFilterChain';
import { MachinePart } from './machinePart';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-machine',
  imports: [FormsModule],
  templateUrl: './machine.html',
  styleUrl: './machine.css',
})
export class Machine {
  isHidden = false;
  text: string = '';
  ciphertext: string = '';
  machineFilterChain: MachineFilterChain = new MachineFilterChain();
  @ViewChild('partsContainer', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;
  partRefs: ComponentRef<MachinePart>[] = [];
  @ViewChild('revealContainer', { static: false }) 
  revealContainer!: ElementRef;
  instanceId: number = Math.floor(Math.random() * 1000000);


  
  constructor(private renderer: Renderer2, @Inject(PLATFORM_ID) private platformId: Object) { 
    
  }

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
    this.partRefs.push(compRef);
    return compRef.instance;
  }

  processText(): void {
    this.ciphertext = this.machineFilterChain.applyFilters(this.text);
  }

  toggleVisibility(): void {
    this.isHidden = !this.isHidden;
    this.partRefs.forEach(partRef => {
      this.togglePartVisibility(partRef, this.isHidden);
    });
  }

  togglePartVisibility(part: ComponentRef<MachinePart>, hidden: boolean): void {
    if(hidden){
      part.location.nativeElement.style.display = 'none';
    } else {
      part.location.nativeElement.style.display = '';
    }
  }

  randomizePartsConfiguration(): void{
    this.machineFilterChain.randomizeConfiguration();
    this.processText();
  }

  addRevealButton(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    
    const button = this.renderer.createElement('button');
    const text = this.renderer.createText('Reveal configuration');
    this.renderer.appendChild(button, text);
    this.renderer.listen(button, 'click', () => this.revealConfiguration());
    this.renderer.appendChild(this.revealContainer.nativeElement, button);
  }

  revealConfiguration(): void {
    const p = this.renderer.createElement('pre');
    const text = this.renderer.createText(this.machineFilterChain.toString());
    this.renderer.appendChild(p, text);
    this.renderer.appendChild(this.revealContainer.nativeElement, p);
    const button = this.revealContainer.nativeElement.querySelector('button');
    if (button) {
      this.renderer.setProperty(button, 'disabled', true);
    }
  }
}
