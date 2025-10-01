import { EventEmitter } from '@angular/core';
export interface MachinePart {
    getFilter() : Filter;
    stateChange: EventEmitter<void>;
}