import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Machine } from "./machine/machine";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Machine],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('misterio');
}
