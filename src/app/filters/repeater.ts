export class RepeaterFilter implements Filter {
  private selector: number = 0;
  private position: number = 1;

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

}