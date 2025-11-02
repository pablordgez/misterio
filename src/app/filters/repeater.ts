export class RepeaterFilter implements Filter {
  private selector: number = 0;
  private position: number = 1;
  private maxSelector: number;
  private hasShifter: boolean;
  private maxShifter: number;

  constructor(maxSelector: number){
      this.maxSelector = maxSelector;
      this.hasShifter = false;
      this.maxShifter = 1;
  }

  setSelector(selector: number) {
    this.selector = Number(selector);
  }

  setPosition(position: number) {
    this.position = Number(position);
  }

  getSelector(): number {
      return this.selector;
  }
  getPosition(): number {
      return this.position;
  }

  setHasShifter(hasShifter: boolean) {
      this.hasShifter = hasShifter;
  }

  setMaxShifter(maxShifter: number) {
      this.maxShifter = maxShifter;
  }

  filter(text: string): string {
        if(this.selector <= 0) return text;
        let output : string = '';
        let counter : number = this.selector;
        let repeatedChars : [string, number][] = [];
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if(counter === this.selector) {
                repeatedChars.push([char, i + this.position]);
                counter = 0;
            }
            counter++;
            if(repeatedChars.length > 0 && repeatedChars[0][1] === i) {
                output += repeatedChars[0][0];
                repeatedChars.shift();
            }
            output += char;
        }
        if(repeatedChars.length > 0) {
            for(let i = 0; i < repeatedChars.length; i++) {
                output += repeatedChars[i][0];
            }
        }
        return output;
    }

    randomizeConfiguration(): void {
        const randomSelector = Math.floor(Math.random() * (this.maxSelector + 1));
        this.setSelector(randomSelector);
        if(this.hasShifter) {
            const randomPosition = Math.floor(Math.random() * this.maxShifter) + 1;
            this.setPosition(randomPosition);
        }
    }

    toString(): string {
        return "Repeater: Selector=" + this.selector + ", Shift=" + this.position + "\n";
    }
}